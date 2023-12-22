"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('main_app/', include('main_app.urls'))
"""
from django.contrib import admin
from django.conf.urls import url
from django.conf import settings
from django.urls import path, include

from .yasg import urlpatterns as doc_url
from django.conf.urls.static import static

import main_app.views as views

urlpatterns = [

    # Админ-панель
    path('admin/', admin.site.urls),

    # Получить все категории
    path('api/categories', views.ShowCategoriesView.as_view()),

    # Получить все товары определенной категории (возможен поиск по буквам)
    path('api/categories/<int:category_pk>', views.ShowProductsView.as_view()),

    # Получить определенный товар
    path('api/products/<int:product_pk>', views.ShowCurrentProductView.as_view()),

    # GET для получения текущего пользователя и списка его заказов + PUT для изменений данных о пользователе
    path('api/account', views.AccountView.as_view()),

    # Узнать, существует ли пользователь с данным email
    path('api/account_recovery', views.UserExistingView.as_view()),

    # Создать новый заказ
    path('api/new_order', views.NewOrderView.as_view()),

    # Сохранить все товары (для срабатывания метода save у всех товаров)
    # path('api/save', views.SaveAllProductsView.as_view()),

    # Авторизация
    url(r'^auth/', include('djoser.urls')),
    url(r'^auth/', include('djoser.urls.jwt')),

]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# urlpatterns += doc_url
urlpatterns.append(url(r'^', views.ReactAppView.as_view()))
