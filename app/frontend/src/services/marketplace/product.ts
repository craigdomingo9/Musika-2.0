



export function splitVariants(products: Product[], config?: Record<string, any>): any[] {

  const uniqueProductUuids = new Set<string>(); // Keep track of processed product UUIDs
  
  return products.flatMap(product =>
    product.variants
      .filter(variant => {
        if (!product.name || !product.description || !variant.price || !variant.image) return false;

        if (config?.on_sale && (!variant.on_sale || !variant.sale_price )) return false;

        return true;
      }) 
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
      })
  );
}

