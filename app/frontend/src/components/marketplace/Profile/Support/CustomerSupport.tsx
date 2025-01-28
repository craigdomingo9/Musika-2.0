"use client";
import Loading from "@/app/dashboard/loading";
import Chat from "@/components/universal/Chat/Chat";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CommunicationEndpoints from "@/services/api/dashboard/communications";
import useFetchConversations from "@/services/api/dashboard/hooks/useFetchConversations";
import useFetchUserProfileInfo from "@/services/api/marketplace/hooks/useFetchUserProfileinfo";
import { constructBody } from "@/services/dashboard/forms/form_utils";
import { dangerToastFactory } from "@/services/marketplace/toast";
import createEntityStore from "@/store/dashboard/EntityStore";

const apiServices = new CommunicationEndpoints();

export const useCustomerSupportAction = createEntityStore(false);


function CustomerSupport() {
  const { toast } = useToast();
  const { entities: action, setEntities: setSupportAction } = useCustomerSupportAction();
  const { data: user } = useFetchUserProfileInfo();
  const { data: supportChats, isLoading } = useFetchConversations({
    type: "customer_platform",
    role: "customer",
    user_uuid: user.uuid,
  }, `${user.uuid}${action}`);


  const supportChat = supportChats?.[0];
  console.log(supportChats)

  async function createSupportChat() {
    apiServices.isOnClient(window);
    try {
      const conversationTitle = `Platform Support to Customer: ${user.full_name || user.username || user.uuid}`;

      const body = constructBody({
        conversation_type: "customer_platform",
        title: conversationTitle,
      });

      const response = await apiServices.createConversation(body);
      if (!response.ok) {
        return dangerToastFactory(toast, "Failed to create conversation. Try again later.");
      }

      // Add participants
      await Promise.all([
        addParticipant(user.id, "customer", (await response.data).id),
        apiServices.addAdminsToConversation((await response.data).uuid),
      ]);

      // Success message can be displayed here (optional)
      console.log("Support chat created successfully!", response.data);
      setSupportAction(!action);

    } catch (error) {
      dangerToastFactory(toast, "Failed to create conversation. Try again later.");
      console.error("Error creating support chat:", error);
    }
  }

  const addParticipant = async (user: number, role: string, conversation: number) => {
    apiServices.isOnClient(window);
    const body = constructBody({ conversation, role, user });
    const response = await apiServices.addParticipants(body);

    if (!response.ok) {
      console.log(response.data)
      throw new Error("Failed to add participant");
    }
  };

  return (
    <div className="page-width flex justify-center items-center">

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!supportChat && (
            <Button 
              className="mt-48"
              onClick={createSupportChat}
            >
              Contact Support
            </Button>
          )}
          {supportChat && (
            <div className="mt-8 w-[95%]">
              <Chat 
                id={supportChat.uuid}
                mode="customer"
              />
            </div>
          )}
        </>
      )}

    </div>
  )
}

export default CustomerSupport