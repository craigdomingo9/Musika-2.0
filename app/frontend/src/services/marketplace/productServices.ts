



export function splitVariants(products: Product[]) {
  const uniqueProductUuids = new Set<string>(); // Keep track of processed product UUIDs
  return products.flatMap(product =>
    product.variants
      .filter(variant => product.name && product.description && variant.price && variant.image) // Filter on-sale variants with both prices and images availability
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