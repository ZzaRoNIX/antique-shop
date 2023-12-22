from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _


from .models import *
from django.contrib.admin import AdminSite

# AdminSite.index_title = 'DATA BASE ADMINISTRATION'
AdminSite.site_title = 'ArtWorldShop.ru'
AdminSite.site_header = 'ArtWorldShop.ru'


class ProductAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_filter = ('category',)
    list_display = ('name', 'category',)
    exclude = ('img_mini',)


class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'last_name', 'first_name', 'middle_name')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('email', 'last_name', 'first_name', 'middle_name', 'phone_number')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password', 'email', 'last_name', 'first_name', 'middle_name', 'phone_number'),
        }),
    )


admin.site.register(User, CustomUserAdmin)
admin.site.register(Category)
admin.site.register(Order)
admin.site.register(Product, ProductAdmin)
