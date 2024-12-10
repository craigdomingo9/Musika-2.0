



export default class CatalogServices {
  private _catalog: Catalog[];

  constructor(catalog: Catalog[]) {
    this._catalog = catalog;
  }

  catalog() {
    return this._catalog
  }


  splitVariants(): Catalog[] {
    const uniqueProductUuids = new Set<string>();
  
    return this._catalog.flatMap(catalog => ({
      ...catalog,
      products: catalog.products.flatMap(product => {
        if (!product.name || !product.description) {
          return []; // Early return for products without name or description
        }

        if (!product.variants) return [];
  
        return product.variants.filter(variant => variant.price && variant.image)
        .map(variant => ({
          id: product.id,
          uuid: product.uuid,
          category: product.category,
          catalog: product.catalog,
          business: product.business,
          name: product.name,
          description: product.description,
          is_featured: product.is_featured,
          created_at: product.created_at,
          variant_id: variant.id,
          stock_quantity: variant.stock_quantity,
          price: variant.price,
          on_sale: variant.on_sale,
          sale_price: variant.sale_price,
          image: variant.image,
          attributes: variant.attributes,
        }))
        .filter(StandardProduct => {
          if (uniqueProductUuids.has(StandardProduct.uuid)) return false;
          uniqueProductUuids.add(StandardProduct.uuid);
          return true;
        });
      })
    })
    );
  }
}