"use client"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import ImageSelectorField from "@/components/universal/Form/Elements/ImageSelectorField"
import InputField from "@/components/universal/Form/Elements/InputField"
import CitySelector from "./CitySelector"
import GenderSelector from "./GenderSelector"
import useFetchProfile from "@/services/api/marketplace/hooks/profile/useFetchProfile"
import { createProfileForm, ProfileOnSubmit, setProfileId } from "@/services/marketplace/forms/profile"
import FormContainer from "@/components/universal/Form/FormContainer"




function ProfileForm() {
  const {data, error, isLoading} = useFetchProfile();
  setProfileId(data.id);


  const form = createProfileForm();


  return (
    <FormContainer HeaderTitle="Edit your profile.">
      {data && (
        <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(ProfileOnSubmit)} 
          className="space-y-2"
        >
  
          <ImageSelectorField 
            form={form} 
            defaultImage={data.profile_picture}
            fieldName="profilePicture" 
            label="Profile Picture" 
          />
          <InputField
            form={form}
            id="username"
            defaultValue={data.username}
            fieldName="username" 
            description="" 
            label="Username"
            placeholder="Enter your username..."
          />
          <InputField
            form={form}
            id="email"
            defaultValue={data.email}
            fieldName="email" 
            description="" 
            label="email"
            placeholder="example@example.com"
          />
          <InputField
            form={form}
            id="first_name"
            defaultValue={data.first_name}
            fieldName="firstName" 
            description="" 
            label="First Name"
            placeholder="Enter your first name..."
          />
          <InputField
            form={form}
            id="last_name"
            defaultValue={data.last_name}
            fieldName="lastName" 
            description="" 
            label="Last Name"
            placeholder="Enter your last name..."
          />
          <InputField
            form={form}
            id="age"
            defaultValue={data.age}
            fieldName="age" 
            description="" 
            label="Age"
            placeholder="Enter your age..."
          />
          <CitySelector 
            form={form}
            defaultValue={data.city}
            />
          <GenderSelector 
            form={form} 
            defaultValue={data.sex}
          />

          <div className="grid py-2">
            <Button type="submit" className="mx-auto w-full">Submit</Button>
          </div>

        </form>
        </Form>
      )}
      
    </FormContainer>
  )
}

export default ProfileForm
