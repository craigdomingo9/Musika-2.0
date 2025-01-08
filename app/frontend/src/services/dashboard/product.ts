


export function fixCatalogVariantImageUrl(url: string, catalog: EditableCatalog[]) {
  const imageUrl = new URL(url).origin; // Extract origin only once

  return catalog.map(catalogItem => ({
    ...catalogItem,
    products: catalogItem.products
    .map(product => ({
      ...product,
      variants: product.variants
      .map(variant => {
        if (!variant.image) return variant
        return {
          ...variant,
          image: { ...variant.image, image: `${imageUrl}${variant.image.image}` },
        }
      }),
    })),
  }));
}

