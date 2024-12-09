

class CartServices {
  constructor() {

  }

  addProductToCart(product: Product ,variant: ProductVariant, addItemToStore: (item: CartProduct) => void) {

    const cartProduct: CartProduct = { 
      ...variant,
      ...product,
      variant_id: variant.id,
      quantity: 1
    };

    addItemToStore(cartProduct);
  }
}

export default CartServices