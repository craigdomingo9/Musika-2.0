import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


export const productSchema = z.object({
  name: z.string().min(2,{ message: 'name must be at least two characters.' }).max(50,{ message: 'name must not be longer than 50 characters.' }),
  description: z.string().optional(),
  category: z.string(),
  catalog: z.string(),
})

export const createProductForm = () => {
  return useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
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
