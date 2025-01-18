import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import InventoryEndpoints from "@/services/api/dashboard/inventory";

const apiServices = new InventoryEndpoints();



export const variantSchema = z.object({
  name: z.string().min(1, "required"),
  value: z.string().min(1, "required"),
  stock_quantity: z.string().refine((val) => val),
  price: z.string().transform((val) => parseInt(val)).refine((val) => val > 0),
  on_sale: z.boolean().optional(),
  sale_price: z.string().optional(),
  image: z.instanceof(File).optional(),
})
.superRefine((val, ctx) => {
  if (val.on_sale && !val.sale_price?.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Sale price is invalid.",
      fatal: true,
      path: ['sale_price']
    });

    return z.NEVER;
  }
  
  if (val.sale_price && !val.on_sale) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Sale is not turned on.",
      fatal: true,
      path: ['sale_price'],
    });
    
    return z.NEVER;
  }

  if (val.on_sale && val.sale_price?.length && parseInt(val.sale_price) > val.price) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Sale price should be lower than price.",
      fatal: true,
      path: ['sale_price']
    });

    return z.NEVER;
  }
})

export const createVariantForm = () => {
  return useForm<z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
  })
}

export function constructBody(values: Record<string, any>) {
  const formData = new FormData();
  
  for (const [key, value] of Object.entries(values)) {
    if (!value) continue;
    
    formData.set(key, value);
  }
  return formData
}


export async function createVariantfn(
  values: any
): Promise<GenericApiResponse<ProductVariant>> {

  const body = constructBody(values);
  apiServices.isOnClient(window);
  
  const createResponse = await apiServices.createVariant(body);
  
  if (!createResponse.ok) {
    throw new Error(`Create variant failed with status: ${createResponse.status}`);
  }

  const createdVariant = await createResponse.data;
  values.variant = createdVariant.id;

  // Create attributes for the new variant
  const attributeBody = constructBody({
    ...values, 
    variant: createdVariant.id 
  });

  const attrResponse = await apiServices.createAttribute(attributeBody);
  
  if (!attrResponse.ok) {
    throw new Error(`Create attribute failed with status: ${createResponse.status}`);
  }

  return createResponse
}


export async function updateVariantfn(
  values: any, 
  variant: ProductVariant | undefined, 
  attribute: ProductAttribute | undefined
): Promise<GenericApiResponse<ProductVariant>> {
  
  const body = constructBody(values);
  
  apiServices.isOnClient(window);
  const updateResponse = await apiServices.updateVariant(
    body, 
    variant?.id
  );
  
  if (!updateResponse.ok) {
    throw new Error(`Update variant failed with status: ${updateResponse.status}`);
  }

  const updatedVariant = await updateResponse.data;
  values.variant = updatedVariant.id;
  
  // Create attributes for the new variant
  const attributeBody = constructBody({ 
    ...values, 
    variant: updatedVariant.id 
  });
  
  const attrResponse = await apiServices.updateAttribute(
    attributeBody, 
    attribute?.id
  );
  
  if (!attrResponse.ok) {
    throw new Error(`Update attribute failed with status: ${attrResponse.status}`);
  }

  return updateResponse
}



export async function uploadImage(
  values: any, 
  variant: ProductVariant | undefined,
  createdVariant: ProductVariant
): Promise<GenericApiResponse<ProductImage>> {
  
  values.id = variant?.image?.id
  values.variant = createdVariant.id

  const imageBody = constructBody({ 
    id: values.id, 
    image: values.image, 
    variant: createdVariant.id 
  });
  
  apiServices.isOnClient(window);
  const imageResponse = await apiServices.postVariantImage(
    imageBody, 
    values.id ? "update" : "create"
  );

  return imageResponse
}

