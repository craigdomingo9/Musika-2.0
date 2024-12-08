

export default class ProductDetailServices {
  private _product: Product;

  constructor(product: Product) {
    this._product = product;
  }

  product() {
    return this._product;
  }

  fixImageUrl(url: string) {
    const urlObject = new URL(url);
    
    const updatedVariants = this._product.variants.map(variant => ({
      ...variant,
      image: {
        ...variant.image,
        image: `${urlObject.origin}${variant.image.image}`
      }
    }));

    this._product =  {
      ...this._product,
      variants: updatedVariants
    };
  }

}