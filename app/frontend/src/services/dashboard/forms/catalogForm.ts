import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const catalogSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

export const createCatalogForm = () => {
  return useForm<z.infer<typeof catalogSchema>>({
    resolver: zodResolver(catalogSchema),
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

