from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from PIL import Image

ORDER_STATUSES = (('В обработке', 'В обработке'),
                  ('Выполнен', 'Выполнен'),
                  ('Отменен', 'Отменен'),)

DELIVERY_TYPES = (('Самовывоз', 'Самовывоз'),
                  ('СДЭК', 'СДЭК'),
                  ('DHL', 'DHL'),)


class Order(models.Model):
    user = models.ForeignKey('User', on_delete=models.SET_NULL, verbose_name='Пользователь', related_name='orders',
                             null=True)
    products = models.ManyToManyField('Product', verbose_name='Продукты', related_name='orders')
    description = models.TextField(_("Описание"), max_length=1000)
    delivery_type = models.CharField(_("Способ получения заказа"), choices=DELIVERY_TYPES, max_length=64,
                                     default='none')
    status = models.CharField(_("Статус заказа"), choices=ORDER_STATUSES, max_length=64, default='В обработке')

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    def __str__(self):
        return 'Заказ №' + str(self.id)

    @classmethod
    def create(cls, user, description, delivery_type):
        order = cls(user=user,
                    description=description,
                    delivery_type=delivery_type)
        return order


class Category(models.Model):
    name = models.CharField(_("Название*"), max_length=100)
    is_main = models.BooleanField(_("Является основной категорией?"), default=False)

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name


class Product(models.Model):
    img_1 = models.ImageField(_("Фотография №1*"), upload_to='Products')
    img_mini = models.ImageField(_("Фотография №1 мини"), upload_to='Products', null=True, blank=True)
    img_2 = models.ImageField(_("Фотография №2"), upload_to='Products', blank=True)
    img_3 = models.ImageField(_("Фотография №3"), upload_to='Products', blank=True)
    img_4 = models.ImageField(_("Фотография №4"), upload_to='Products', blank=True)
    img_5 = models.ImageField(_("Фотография №5"), upload_to='Products', blank=True)
    name = models.CharField(_("Название*"), max_length=100)
    description = models.TextField(_("Описание*"), max_length=1000)
    price = models.IntegerField(_("Цена*"), null=True)
    sale_price = models.IntegerField(_("Цена по скидке"), blank=True, null=True, default=0)
    is_contract_price = models.BooleanField(_("Договорная цена"), default=False)

    category = models.ForeignKey('Category', on_delete=models.SET_NULL, verbose_name='Категория*',
                                 related_name='products', null=True)

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        print(self.img_1)
        im1 = Image.open(self.img_1)
        fname = f'{self.id}-mini.jpeg'
        print(fname)
        im1.save('media/Products/' + fname, "JPEG", quality=10)
        self.img_mini = 'Products/' + fname
        print(self.img_mini)
        super().save(*args, **kwargs)


class User(AbstractUser):
    last_name = models.CharField(_("Фамилия"), max_length=50)
    first_name = models.CharField(_("Имя"), max_length=50)
    middle_name = models.CharField(_("Отчество"), max_length=50, blank=True)
    phone_number = models.CharField(_("Номер телефона"), max_length=20)

    REQUIRED_FIELDS = ['email', 'last_name', 'first_name', 'middle_name', 'phone_number']

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return f'{self.last_name} {self.first_name} {self.middle_name}'
