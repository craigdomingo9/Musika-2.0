import Loading from "@/app/dashboard/loading";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ImageSelectorField from "@/components/universal/Form/Elements/ImageSelectorField";
import InputField from "@/components/universal/Form/Elements/InputField";
import SelectField from "@/components/universal/Form/Elements/SelectField";
import TextareaField from "@/components/universal/Form/Elements/TextareaField";
import FormContainer from "@/components/universal/Form/FormContainer";
import { useToast } from "@/hooks/use-toast";
import { business_types } from "@/lib/lists";
import useFetchBusiness from "@/services/api/dashboard/hooks/business/useFetchBusiness";
import ProfileEndpoints from "@/services/api/marketplace/profile";
import { createBusinessProfileForm } from "@/services/dashboard/forms/businessProfileForm"
import { constructBody } from "@/services/dashboard/forms/form_utils";
import { dangerToastFactory, successToastFactory } from "@/services/marketplace/toast";
import createEntityStore from "@/store/dashboard/EntityStore";
import { useEffect } from "react";


const apiServices = new ProfileEndpoints();
apiServices.isOnClient(window);

export const useBusinessProfileAction = createEntityStore(false);


function BusinessProfileForm() {
  const { entities: action, setEntities: setAction } = useBusinessProfileAction();
  const { data: business, isLoading } = useFetchBusiness(action);
  const form = createBusinessProfileForm();
  const { toast } = useToast();


  async function ProfileOnSubmit(values: any) {
    try {
      values = {
        ...values,
        categories: business.profile.categories,
        profile: business.profile.id,
      }
      const body = constructBody(values);

      const response = await apiServices.updateBusinessProfile(body, business.profile.id);

      if (!response.ok) {
        console.log(response.data)
        return dangerToastFactory(toast, "Profile failed to update. Please try again later.")
      }
      
      successToastFactory(toast, "Profile was updated successfully");
      setAction(!action)
    } catch (error) {
      console.log(error)
      dangerToastFactory(toast, "Error. Try again later.")
    }
  }



  useEffect(() => {}, [action])

  
  return (
    <FormContainer className="text-sm sm:w-[448px]">
      {isLoading ? (
        <Loading />
      ) : (
        <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(ProfileOnSubmit)} 
          className="space-y-2"
        >

          {business.profile && (
          <>
            <ImageSelectorField 
              form={form} 
              defaultImage={business.profile.logo}
              fieldName="logo" 
              label="Logo" 
            />

            <InputField
              form={form}
              defaultValue={business.profile.name}
              fieldName="name" 
              label="Name"
              autoComplete="name"
            />

            <TextareaField
              form={form}
              defaultValue={business.profile.description}
              fieldName="description" 
              label="Description"
            />

            <SelectField 
              form={form}
              defaultValue={business.profile.business_type}
              fieldName="business_type"
              label="Business Type"
              selectionList={business_types}
              placeholder="retail" 
            />

            <InputField
              form={form}
              defaultValue={business.profile.phone_number}
              fieldName="phone_number" 
              label="Phone Number"
              autoComplete="phone_number"
              />

            <InputField
              form={form}
              defaultValue={business.profile.email}
              fieldName="email" 
              label="Email"
              type="email"
              autoComplete="email"
              />
          </>
          )}

          <div className="grid py-2">
            <Button type="submit" className="mx-auto w-full">Submit</Button>
          </div>
  
        </form>
        </Form>
      )}
    </FormContainer>
  )
}

export default BusinessProfileForm