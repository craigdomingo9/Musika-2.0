
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


export const agentProfileSchema = z.object({
  first_name: z.string().min(2,{ message: 'name must be at least two characters.' }).max(50,{ message: 'name must not be longer than 50 characters.' }),
  last_name: z.string().min(2,{ message: 'name must be at least two characters.' }).max(50,{ message: 'name must not be longer than 50 characters.' }),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().optional(),
  bio: z.string(),
  minimum_commission_rate: z.string(),
  social_links: z.string().optional(),
  profile_picture: z.instanceof(File).optional(),
})

export const createAgentProfileForm = () => {
  return useForm<z.infer<typeof agentProfileSchema>>({
    resolver: zodResolver(agentProfileSchema),
  })
}