from rest_framework import serializers
from .models import *


class ProductForOrderSerializer(serializers.ModelSerializer):
    class Meta:
        depth = 2
        model = Product
        fields = ('id', 'name', 'price', 'sale_price', 'is_contract_price')


class OrderSerializer(serializers.ModelSerializer):
    products = ProductForOrderSerializer(read_only=True, many=True)

    class Meta:
        depth = 2
        model = Order
        exclude = ('user',)


class AccountSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(read_only=True, many=True)

    class Meta:
        depth = 2
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'middle_name', 'phone_number', 'orders')


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        depth = 2
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'middle_name', 'phone_number')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        depth = 2
        model = Category
        fields = '__all__'


class CurrentProductSerializer(serializers.ModelSerializer):
    class Meta:
        depth = 2
        model = Product
        exclude = ('img_1', 'img_2', 'img_3', 'img_4', 'img_5',)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        depth = 2
        model = Product
        exclude = ('img_2', 'img_3', 'img_4', 'img_5',)


class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        depth = 2
        model = Product
        fields = ('img_1', 'img_2', 'img_3', 'img_4', 'img_5',)
