"use client"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import ImageSelectorField from "@/components/universal/Form/Elements/ImageSelectorField"
import InputField from "@/components/universal/Form/Elements/InputField"
import CitySelector from "./CitySelector"
import GenderSelector from "./GenderSelector"
import { createProfileForm } from "@/services/marketplace/forms/profile"
import FormContainer from "@/components/universal/Form/FormContainer"
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile"
import Loading from "@/app/dashboard/loading"
import { constructBody } from "@/services/dashboard/forms/form_utils"
import ProfileEndpoints from "@/services/api/marketplace/profile"
import { dangerToastFactory, successToast } from "@/services/marketplace/toast"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"




function ProfileForm() {
  const {data: user, isLoading} = useUserProfile();
  const { toast } = useToast();
  const [IsUpdating, setIsUpdating] = useState(false);
  const form = createProfileForm();

  async function ProfileOnSubmit(values: any) {
    setIsUpdating(true);
    try {
      if (!user.id) return;

      const body = constructBody(values);
  
      const apiServices = new ProfileEndpoints();
      apiServices.isOnClient(window);
      const response = await apiServices.updateProfile(body, user.id)

      if (!response.ok) {
        console.log(response.data);
        setIsUpdating(false);
        return dangerToastFactory(toast, "Profile failed to update. Try again later.");
      }

      successToast(toast, "Profile", "updated");
      setIsUpdating(false);
      
    } catch (error: any) {
      console.log(error);
      setIsUpdating(false);
      dangerToastFactory(toast, "Profile failed to update. Try again later.");
    }
    
  }
  

  return (
    <FormContainer HeaderTitle="Edit your profile.">
      {isLoading ? (
        <Loading />
      ) : (
        <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(ProfileOnSubmit)} 
          className="space-y-2"
        >
  
          <ImageSelectorField 
            form={form} 
            defaultImage={user.profile_picture}
            fieldName="profilePicture" 
            label="Profile Picture" 
          />
          <InputField
            form={form}
            id="username"
            defaultValue={user.username}
            fieldName="username" 
            description="" 
            label="Username"
            placeholder="Enter your username..."
            autoComplete="username"
          />
          <InputField
            form={form}
            id="email"
            defaultValue={user.email}
            fieldName="email" 
            description="" 
            label="email"
            placeholder="example@example.com"
            autoComplete="email"
          />
          <InputField
            form={form}
            id="first_name"
            defaultValue={user.first_name}
            fieldName="firstName" 
            description="" 
            label="First Name"
            placeholder="Enter your first name..."
            autoComplete="first-name"
          />
          <InputField
            form={form}
            id="last_name"
            defaultValue={user.last_name}
            fieldName="lastName" 
            description="" 
            label="Last Name"
            placeholder="Enter your last name..."
            autoComplete="last-name"
          />
          <InputField
            form={form}
            id="age"
            defaultValue={user.age}
            fieldName="age" 
            description="" 
            label="Age"
            placeholder="Enter your age..."
          />
          <CitySelector 
            form={form}
            defaultValue={user.city}
            />
          <GenderSelector 
            form={form} 
            defaultValue={user.sex}
          />

          <div className="grid py-2">
            <Button type="submit" className="mx-auto w-full">
              {IsUpdating ? "Updating..." : "Update"}
            </Button>
          </div>

        </form>
        </Form>
      )}
      
    </FormContainer>
  )
}

export default ProfileForm
