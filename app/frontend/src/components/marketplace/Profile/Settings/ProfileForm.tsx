"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import InputField from "./Form/Elements/InputField"
import CitySelector from "./Form/CitySelector"
import GenderSelector from "./Form/GenderSelector"
import ImageSelectorField from "./Form/Elements/ImageSelectorField"


const formSchema = z.object({
  username: z.string().min(2).max(50),
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  gender: z.string().min(2).max(100),
  age: z.string().min(1).max(3),
  // profilePicture: z.instanceof(File),
  city: z.string(),
})



function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      age: "",
      city: "",
      gender: "",
      
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="shadow rounded-lg p-2 sm:w-[400px] sm:m-auto">
      <div className="text-center text-xs font-semibold mb-4">
        <p>Edit your profile.</p>
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <ImageSelectorField form={form} fieldName="profile_picture" label="Profile Picture" />
        <InputField
         form={form}
         fieldName="username" 
         description="" 
         label="Username"
         placeholder="Enter your username..."
        />
        <InputField
         form={form}
         fieldName="firstName" 
         description="" 
         label="First Name"
         placeholder="Enter your first name..."
        />
        <InputField
         form={form}
         fieldName="lastName" 
         description="" 
         label="Last Name"
         placeholder="Enter your last name..."
        />
        <InputField
         form={form}
         fieldName="age" 
         description="" 
         label="Age"
         placeholder="Enter your age..."
        />
        <CitySelector form={form} />
        <GenderSelector form={form} />
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      
    </div>
  )
}

export default ProfileForm
