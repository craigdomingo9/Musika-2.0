import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ProfileEndpoints from "@/services/api/endpoints/marketplace/profile"



let profile_id = 0;

export const setProfileId = (id: number) => {
  profile_id = id;
}

export const profileFormSchema = z.object({
  username: z.string().min(2,{ message: 'username must be at least two characters.' }).max(50,{ message: 'username must not be longer than 50 characters.' }),
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2).max(100).optional(),
  lastName: z.string().min(2).max(100).optional(),
  gender: z.string().min(2).max(100),
  age: z.string().min(1,{ message: 'Please enter a valid age.' }).max(3, { message: 'Please enter a valid age.' }),
  profilePicture: z.instanceof(File).optional(),
  city: z.string(),
})


export const createProfileForm = () => {
  return useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
  })
}


function constructBody(values: Record<string, any>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    if (!value) continue;
    
    formData.set(key, value);
  }

  return formData
}



export async function ProfileOnSubmit(values: z.infer<typeof profileFormSchema>) {
  
  const body = constructBody(values);

  const apiServices = new ProfileEndpoints();
  apiServices.isOnClient(window);
  console.log(await apiServices.updateProfile(body, profile_id))
}
