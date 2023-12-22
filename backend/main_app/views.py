import os
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.views.generic.base import View
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .serializers import *
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from project.settings import DEFAULT_FROM_EMAIL, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PHONE_NUMBER, DEFAULT_DEV_EMAIL
from django.template.loader import render_to_string


class SaveAllProductsView(APIView):
    """
    Saves all products (view only for dev)
    """

    def get(self, request):
        products = Product.objects.all()
        for product in products:
            product.save()

        return Response(True)


class NewOrderView(APIView):
    """
    Creates new order
    """

    # def get(self, request):
    #     orders = Order.objects.filter(user=request.user.id)
    #     serializer = AccountSerializer(orders, context={'request': request}, many=True)
    #
    #     return Response(serializer.data)

    def post(self, request):
        try:
            order = Order.create(request.user, request.data['description'], request.data['delivery_type'])
            order.save()

            i = 0
            products_message = str()
            products = list()
            for product_id in request.data['product_ids']:
                i += 1
                order.products.add(product_id)
                product = Product.objects.get(pk=product_id)
                products.append(product)

                product_message = f'''
                    Позиция №{i}:
                    Наименование: {product.name}
                    Категория: {product.category}
                    Ссылка на товар: https://artworldshop.ru/catalog/{product.category.id}/{product_id}\n'''
                products_message += product_message

            order.save()

            admin_message = f'''
                Уважаемый администратор, поступил новый заказ!\n
                    Номер заказа: {order.id}\n
                    Выбранные товары:
                            {products_message}\n
                    Данные покупателя:\n
                            ФИО: {request.user.last_name} {request.user.first_name} {request.user.middle_name}
                            Email: {request.user.email}
                            Телефон: {request.user.phone_number}'''

            data = {
                'last_name': request.user.last_name,
                'first_name': request.user.first_name,
                'middle_name': request.user.middle_name,
                'user_email': request.user.email,
                'user_phone_number': request.user.phone_number,
                'admin_email': DEFAULT_ADMIN_EMAIL,
                'admin_phone_number': DEFAULT_ADMIN_PHONE_NUMBER,
                'products': products,
                'order': order
            }

            msg_plain = render_to_string('email.txt', {})
            msg_html = render_to_string('user_order.html', data)
            send_mail(
                'Заказ на сайте ArtWorldShop',
                msg_plain,
                DEFAULT_FROM_EMAIL,
                [request.user.email, DEFAULT_DEV_EMAIL],
                html_message=msg_html,
            )

            msg_html = render_to_string('admin_order.html', data)
            send_mail(
                'Новый заказ на сайте ArtWorldShop',
                msg_plain,
                DEFAULT_FROM_EMAIL,
                [DEFAULT_ADMIN_EMAIL, DEFAULT_DEV_EMAIL],
                html_message=msg_html,
            )

            return Response(True)
        except BadHeaderError:
            return Response('Ошибка в теле письма')
        except Exception as e:
            raise e
            return Response(False)


class UserExistingView(APIView):
    """
    Shows true if user exists of false if user doesn't exists
    """

    def post(self, request):
        try:
            user = User.objects.get(email=request.POST['email'])
            return Response(True)
        except Exception as e:
            return Response(False)


class AccountView(APIView):
    """
    Shows current user and his orders
    """

    def get(self, request):
        user = User.objects.get(pk=request.user.id)
        serializer = AccountSerializer(user, context={'request': request})

        return Response(serializer.data)

    def put(self, request):
        user = User.objects.get(pk=request.user.id)

        try:
            user.last_name = request.data['last_name']
            user.first_name = request.data['first_name']
            user.middle_name = request.data['middle_name']
            user.phone_number = request.data['phone_number']

            user.save()

            return Response(True)

        except Exception as e:
            return Response(e)


class ShowProductsView(APIView):
    """
    Shows all products of current category (searching by letters available)
    """

    def post(self, request, category_pk):
        find_by_letters = request.POST['find_by_letters']

        data = []
        next_page = 1
        previous_page = 1
        products = Product.objects.filter(
            Q(category=category_pk),
            Q(name__icontains=find_by_letters) |
            Q(name__icontains=find_by_letters.capitalize()) |
            Q(name__icontains=find_by_letters.lower()) |
            Q(name__icontains=find_by_letters.upper())
        )

        page = request.GET.get('page', 1)
        paginator = Paginator(products, 12)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = ProductSerializer(data, context={'request': request}, many=True)

        if data.has_next():
            next_page = data.next_page_number()
        if data.has_previous():
            previous_page = data.previous_page_number()

        return Response({'products': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
                         'nextlink': '/api/categories/' + str(category_pk) + '?page=' + str(next_page),
                         'prevlink': '/api/categories/' + str(category_pk) + '?page=' + str(previous_page)})


class ShowCategoriesView(APIView):
    """
    Shows all categories
    """

    def get(self, request):
        categories = Category.objects.all().order_by('-is_main')
        serializer = CategorySerializer(categories, context={'request': request}, many=True)

        return Response(serializer.data)


class ShowCurrentProductView(APIView):
    """
    Shows current product
    """

    def get(self, request, product_pk):
        product = Product.objects.get(pk=product_pk)
        product_data = CurrentProductSerializer(product, context={'request': request}).data
        images_dict = ProductImagesSerializer(product, context={'request': request}).data

        images = list()
        for el in images_dict.values():
            if el:
                images.append(el)
        product_data.update({'images': images})

        return Response(product_data)


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class ReactAppView(View):

    def get(self, request):
        try:
            with open(os.path.join(BASE_DIR, 'frontend', 'build', 'index.html')) as file:
                return HttpResponse(file.read())

        except Exception:
            return HttpResponse(
                """
                index.html not found ! build your React app !!
                """,
                status=501,
            )
