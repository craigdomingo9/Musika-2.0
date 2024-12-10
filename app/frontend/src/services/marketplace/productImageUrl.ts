export const fixProductImageUrl = (url: string, products: StandardProduct[]) => {
  const urlObject = new URL(url);
  return products.map(product => {
    return {
      ...product,
      image: {
        ...product.image,
        image: `${urlObject.origin}${product.image.image}`
      }
    }
  })
}