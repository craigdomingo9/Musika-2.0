import Loading from "@/app/dashboard/loading";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ImageSelectorField from "@/components/universal/Form/Elements/ImageSelectorField";
import InputField from "@/components/universal/Form/Elements/InputField";
import TextareaField from "@/components/universal/Form/Elements/TextareaField";
import FormContainer from "@/components/universal/Form/FormContainer";
import { useToast } from "@/hooks/use-toast";
import useFetchAgent from "@/services/api/dashboard/hooks/agent/useFetchAgent";
import ProfileEndpoints from "@/services/api/marketplace/profile";
import { createAgentProfileForm } from "@/services/dashboard/forms/agentProfileForm"
import { constructBody } from "@/services/dashboard/forms/form_utils";
import { dangerToastFactory, successToastFactory } from "@/services/marketplace/toast";
import createEntityStore from "@/store/dashboard/EntityStore";
import { useEffect } from "react";


const apiServices = new ProfileEndpoints();
apiServices.isOnClient(window);


export const useAgentProfileAction = createEntityStore(false);

function AgentProfileForm() {
  const { entities: action, setEntities: setAction } = useAgentProfileAction();
  const { data: agent, isLoading } = useFetchAgent({}, action);
  const form = createAgentProfileForm();
  const { toast } = useToast();
  

  async function ProfileOnSubmit(values: any) {
    try {
      const agentData: any = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone_number: values.phone_number,
      };
  
      const agentProfileData: any = {
        bio: values.bio,
        minimum_commission_rate: values.minimum_commission_rate,
        social_links: JSON.stringify(values.social_links),
        profile_picture: values.profile_picture,
      };
  
      const rawBody = {
        ...agentData,
        profile: agentProfileData, 
      };

      const body = constructBody(rawBody);

      const response = await apiServices.updateAgentProfile(body, agent.user.uuid);

      if (!response.ok) {
        console.error("Error updating profile:", response.data);
        return dangerToastFactory(toast, "Profile update failed. Check the console for details.");
      }

      successToastFactory(toast, "Profile was updated successfully");
      setAction(!action);

    } catch (error) {
      console.error(error);
      dangerToastFactory(toast, "Error. Try again later.");
    }
  }

  useEffect(() => {}, [action])

  return (
    <FormContainer className="text-sm sm:w-[448px]">
      {isLoading ? (
        <Loading />
      ) : (
        <Form {...form}>
        {agent.profile && (
        <form 
          onSubmit={form.handleSubmit(ProfileOnSubmit)} 
          className="space-y-2"
        >
          <ImageSelectorField 
            form={form} 
            defaultImage={agent.profile.profile_picture}
            fieldName="logo" 
            label="Logo" 
          />

          <InputField
            form={form}
            defaultValue={agent.first_name}
            fieldName="first_name" 
            label="First Name"
            autoComplete="first-name"
          />

          <InputField
            form={form}
            defaultValue={agent.last_name}
            fieldName="last_name" 
            label="Last Name"
            autoComplete="last-name"
          />

          <InputField
            form={form}
            defaultValue={agent.email}
            fieldName="email" 
            label="Email"
            type="email"
            autoComplete="email"
          />

          <InputField
            form={form}
            defaultValue={agent.phone_number}
            fieldName="phone_number" 
            label="Phone Number"
            autoComplete="phone-number"
          />

          <TextareaField
            form={form}
            defaultValue={agent.profile.bio}
            fieldName="bio" 
            label="Bio"
          />

          <InputField
            form={form}
            defaultValue={agent.profile.minimum_commission_rate}
            fieldName="minimum_commission_rate" 
            label="Minimum Commission Rate"
          />

          <TextareaField
            form={form}
            defaultValue={agent.profile.social_links}
            fieldName="social_links" 
            label="Social Links"
          />
          <div className="grid py-2">
            <Button type="submit" className="mx-auto w-full">Submit</Button>
          </div>

        </form>
        )}
        </Form>
      )}
    </FormContainer>
  )
}

export default AgentProfileForm