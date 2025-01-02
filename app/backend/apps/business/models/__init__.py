from .business_models import Business
from .profile_models import Profile
from .location_models import Location

from .product_models import Product, Catalog, Category
from .product_variant_models import ProductVariant, VariantAttribute
from .product_image_models import ProductImage
from .product_reviews_models import ProductReview


from business.utils.models import (
    generate_unique_code,
)




def generate_code():
    return generate_unique_code(Business)

