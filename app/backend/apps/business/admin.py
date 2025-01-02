from django.contrib import admin

from business.models import (
    Business, 
    Profile, 
    Location, 
    Category, 
    Catalog, 
    ProductReview, 
    Product, 
    ProductImage, 
    ProductVariant, 
    VariantAttribute
)

# Register your models here.
admin.site.register(Business)
admin.site.register(Profile)
admin.site.register(Location)
admin.site.register(Category)
admin.site.register(Catalog)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(ProductVariant)
admin.site.register(VariantAttribute)
admin.site.register(ProductReview)
