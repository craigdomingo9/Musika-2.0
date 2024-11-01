from django.db import models
from django.contrib.auth import get_user_model
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.postgres.indexes import GinIndex

User = get_user_model()

from business.utils.models import generate_unique_code, get_field_args, get_default_operating_hours


def generate_code():
    return generate_unique_code(Business)


"""   Business   """
class Business(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=8,default=generate_code)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']
        verbose_name_plural = "Businesses"
    
    def __str__(self) -> str:
        return f"{self.user.username}'s business"



"""   Business Profile   """
class Profile(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(**get_field_args(null=False,blank=False))
    description = models.TextField(**get_field_args(max_length=1000))
    categories = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='images/business/logos', blank=True)
    cover_photo = models.ImageField(upload_to='images/business/covers', blank=True)
    phone_number = PhoneNumberField(null=True, blank=True, unique=True)
    email = models.EmailField(unique=True)
    website = models.URLField(**get_field_args())
    business_type = models.CharField(max_length=50, choices=[('retail', 'Retail'), ('service', 'Service')])
    
    class Meta:
        ordering = ['name']
        
    def __str__(self) -> str:
        return self.name



"""   Business Location   """
class Location(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name="locations")
    name = models.CharField(max_length=50, blank=False, default="Main Location")
    address = models.CharField(**get_field_args())
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    city = models.CharField(**get_field_args())
    country = models.CharField(default='Zimbabwe', **get_field_args())
    operating_hours = models.JSONField(blank=True, default=get_default_operating_hours)

        
    def __str__(self) -> str:
        return f"{self.name} - {self.address}, {self.city}"



"""   Category   """
class Category(models.Model):
    name = models.CharField(**get_field_args(blank=False))
    description = models.TextField(**get_field_args(max_length=300))
    image = models.ImageField(upload_to='images/business/category',blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        verbose_name_plural = "Categories"
    
    def __str__(self) -> str:
        return self.name
    
    @property
    def has_products(self):
        has_products = Product.objects.filter(category=self.id).exists()
        return has_products



"""   Catalog   """
class Catalog(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name="catalogs")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="catalogs")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.name



"""   Product Reviews   """
class ProductReview(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    rating = models.IntegerField()  # Rating out of 5
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author.username} - {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}"



"""   Product   """
class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    catalog = models.ForeignKey(Catalog, on_delete=models.CASCADE, related_name="products")
    business = models.ForeignKey(Business, on_delete=models.CASCADE,related_name="products")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            GinIndex(fields=['name'], name='gin_name_trgm_idx', opclasses=['gin_trgm_ops']),
            GinIndex(fields=['description'], name='gin_description_trgm_idx', opclasses=['gin_trgm_ops']),
        ]

    def __str__(self) -> str:
        return self.name



"""   Product Image   """
class ProductImage(models.Model):
    variant = models.ForeignKey("ProductVariant", on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to='images/business/products')
    alt_text = models.CharField(**get_field_args())
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.product.name



"""   Product Variant   """
class ProductVariant(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE, related_name="variant")
    stock_quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2,blank=True )
    on_sale = models.BooleanField(default=False)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True) 

    def __str__(self) -> str:
        return f"{self.product.name} - Variant ID: {self.id}, Price: {self.price}"



"""   Variant Attribute   """
class VariantAttribute(models.Model):
    variant = models.ForeignKey("ProductVariant", on_delete=models.CASCADE, related_name="attributes")
    name = models.CharField(**get_field_args(blank=False,null=False))
    value = models.CharField(**get_field_args(blank=False,null=False))

    def __str__(self) -> str:
        return f"{self.name}: {self.value}"

