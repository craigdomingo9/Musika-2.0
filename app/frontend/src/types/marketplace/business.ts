




type SearchResult = {
  id: number,
  name: string,
}


interface Category {
  id: number,
  name: string,
  description: string,
  has_products: boolean,
}

interface Catalog {
  id: number,
  name: string,
  description: string,
  products: StandardProduct[],
  created_at: string,
}

interface BusinessProfile {
  id: number,
  name: string,
  description: string,
  categories: string,
  logo: string,
  phone_number: string,
  email: string,
  website: string,
  business_type: string,
}

interface Business {
  id: number,
  user: UserProfile,
  code: string,
  created_at: string,
  profile: BusinessProfile,
}

interface ProductImage {
  id: number,
  image: string,
  alt_text: string,
}

interface ProductAttribute {
  id: number,
  name: string,
  value: string,
}

interface ProductVariant {
  id: number,
  stock_quantity: number,
  price: string,
  on_sale: boolean,
  sale_price: string,
  image: ProductImage,
  attributes: ProductAttribute[],
  product?: Product
}

interface UserProfile {
  id: number,
  first_name: string,
  last_name: string,
  username: string,
  business_profile?: Business,
  agent_profile?: Agent,
  uuid: string,
  profile_picture: string,
  email: string,
  age: string,
  sex: string,
  city: string,
  is_agent: boolean,
  is_business: boolean,
  is_anonymous: boolean,
  is_active: boolean,
  is_admin: boolean,
  created_at: boolean,
}

interface ProductReview {
  id: number,
  content: string,
  rating: number,
  user: UserProfile,
}

interface Product {
  id: number,
  uuid: string,
  category: number,
  catalog: number,
  business: Business,
  name: string,
  description: string,
  is_featured: string,
  created_at: string,
  variants: ProductVariant[],
  reviews: ProductReview[],
}


interface StandardProduct {
  id: number,
  uuid: string,
  category: Category,
  catalog: Catalog,
  business: Business,
  name: string,
  description: string,
  is_featured: string,
  created_at: string,
  variant_id: number,
  stock_quantity: number,
  price: string,
  on_sale: boolean,
  sale_price: string,
  image: ProductImage,
  attributes: ProductAttribute[],
  variants: ProductVariant[]
  reviews: ProductReview[],
}

interface CartProduct extends StandardProduct {
  quantity: number,
}


interface Notification {
  id: number,
  user: UserProfile,
  topic: string,
  priority: "low" | "medium" | "high",
  message: string,
  is_read: boolean,
  sent_at: string,
  created_at: string,
}

