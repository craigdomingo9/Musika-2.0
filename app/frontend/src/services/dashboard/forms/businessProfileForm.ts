

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


export const businessProfileSchema = z.object({
  name: z.string().min(2,{ message: 'name must be at least two characters.' }).max(50,{ message: 'name must not be longer than 50 characters.' }),
  description: z.string().optional(),
  phone_number: z.string().optional(),
  logo: z.instanceof(File).optional(),
  email: z.string().email("Invalid email address"),
  business_type: z.string(),
})

export const createBusinessProfileForm = () => {
  return useForm<z.infer<typeof businessProfileSchema>>({
    resolver: zodResolver(businessProfileSchema),
  })
}

