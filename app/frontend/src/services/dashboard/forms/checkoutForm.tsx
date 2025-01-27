import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


export const checkoutFormSchema = z.object({
  first_name: z.string().min(2,{ message: 'name must be at least two characters.' }).max(50,{ message: 'name must not be longer than 50 characters.' }),
  last_name: z.string().optional(),
  phone_number: z.string(),
  address: z.string(),
  country_code: z.string().default("263"),
})


export const createCheckoutForm = () => {
  return useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
  })
}
