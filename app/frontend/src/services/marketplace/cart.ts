

class CartServices {
  constructor() {

  }

  addProductToCart(product: Product, referrerAgent: string | undefined ,variant: ProductVariant, addItemToStore: (item: CartProduct) => void) {

    const cartProduct: CartProduct = { 
      ...variant,
      ...product,
      variant_id: variant.id,
      quantity: 1,
      referrerAgent: referrerAgent
    };

    addItemToStore(cartProduct);
  }
}

export default CartServices