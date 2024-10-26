import random
from django.core.management.base import BaseCommand
from faker import Faker
from django.contrib.auth import get_user_model

User = get_user_model()

from business.models import Business, Profile, Location, Category, Catalog, ProductReview, Product, ProductImage, ProductVariant, VariantAttribute

class Command(BaseCommand):
    help = 'Populate the database with fake data'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Define real product categories
        predefined_categories = [
            "Electronics",
            "Clothing",
            "Home & Kitchen",
            "Beauty & Personal Care",
            "Sports & Outdoors",
            "Automotive",
            "Books",
            "Toys & Games",
            "Health & Wellness",
            "Office Supplies"
        ]

        # Create Categories in the database from predefined categories
        # categories = [Category.objects.create(name=cat) for cat in predefined_categories]
        categories = Category.objects.all()
        
        # Create Businesses and Profiles
        businesses = []
        for _ in range(5):  # Create 5 businesses
            business = Business.objects.create(
                user=random.choice(User.objects.all())  # Assuming you have User model populated
            )
            Profile.objects.create(
                business=business,
                name=fake.company(),
                description=fake.paragraph(),
                categories=random.choice(categories).name,
                phone_number=fake.phone_number(),
                email=fake.email(),
                website=fake.url(),
                business_type=random.choice([('retail', 'Retail'), ('service', 'Service')])
            )
            businesses.append(business)

        # Create Locations
        for business in businesses:
            for _ in range(3):  # Each business has 3 locations
                Location.objects.create(
                    business=business,
                    name=fake.city(),
                    address=fake.address(),
                    latitude=fake.latitude(),
                    longitude=fake.longitude(),
                    city=fake.city(),
                    country=fake.country(),
                )
        
        # Create Catalogs
        catalogs = []
        for business in businesses:
            for _ in range(3):  # Each business has 3 catalogs
                catalog = Catalog.objects.create(
                    business=business,
                    category=random.choice(categories),
                    name=fake.word().capitalize(),
                    description=fake.sentence()
                )
                catalogs.append(catalog)

        # Create Products and Variants
        products = []
        for catalog in catalogs:
            for _ in range(5):  # Each catalog has 5 products
                product = Product.objects.create(
                    business=catalog.business,
                    category=catalog.category,
                    catalog=catalog,
                    name=fake.word().capitalize(),
                    description=fake.paragraph(),
                    is_featured=random.choice([True, False])
                )
                products.append(product)

                # Create Variants for each product
                for _ in range(2):  # Each product has 2 variants
                    variant = ProductVariant.objects.create(
                        product=product,
                        stock_quantity=random.randint(1, 100),
                        price=round(fake.random_number(digits=2) + random.random(), 2),  # Random price
                        on_sale=random.choice([True, False]),
                        sale_price=round(fake.random_number(digits=2) + random.random(), 2) if random.choice([True, False]) else None
                    )

                    # Create Product Images for each variant
                    ProductImage.objects.create(
                        variant=variant,
                        image='images/business/products/default_image.jpg',  # Placeholder image path
                        alt_text=fake.sentence()
                    )

                # Create Reviews for each product
                for _ in range(3):  # Each product gets 3 reviews
                    ProductReview.objects.create(
                        product=product,
                        user=random.choice(User.objects.all()),  # Assuming User model populated
                        content=fake.sentence(),
                        rating=random.randint(1, 5)  # Random rating between 1 and 5
                    )

                # Create Attributes for each variant
                for _ in range(3):  # Each variant gets 3 attributes
                    VariantAttribute.objects.create(
                        name=fake.word(),
                        value=fake.word()
                    )

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))