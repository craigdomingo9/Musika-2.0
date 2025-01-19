import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast";
import { agentMode } from "@/lib/dashboard/constants";
import CommunicationEndpoints from "@/services/api/dashboard/communications";
import useFetchAgent from "@/services/api/dashboard/hooks/agent/useFetchAgent";
import useFetchBusiness from "@/services/api/dashboard/hooks/business/useFetchBusiness";
import { constructBody } from "@/services/dashboard/forms/form_utils";
import { dangerToastFactory } from "@/services/marketplace/toast";
import { useSupportAction } from "../Support";

const apiServices = new CommunicationEndpoints();

type Props = {
  mode: string,
}

function CreateSupportButton({mode}: Props) {
  const { entities: action, setEntities: setSupportAction } = useSupportAction();
  const { data: business } = useFetchBusiness();
  const { data: agent } = useFetchAgent();
  const { toast } = useToast();

  const isAgentMode = mode === agentMode();


  const handleCreateSupportChat = async () => {
    apiServices.isOnClient(window);
    try {
      const conversationTitle = `Platform Support to ${
        isAgentMode ? 'Agent: ' + agent.full_name : 'Business: ' + business.profile.name
      }`;

      const body = constructBody({
        conversation_type: "business_agent_platform",
        title: conversationTitle,
      });
      
      const response = await apiServices.createConversation(body);
      if (!response.ok) {
        return dangerToastFactory(toast, "Failed to create conversation. Try again later.");
      }

      // Add participants
      await Promise.all([
        addParticipant(isAgentMode ? agent.user.id : business.user.id, mode.toLowerCase(), (await response.data).id),
        apiServices.addAdminsToConversation((await response.data).uuid),
      ]);

      // Success message can be displayed here (optional)
      console.log("Support chat created successfully!");
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

  return <Button onClick={handleCreateSupportChat}>Chat +</Button>;
}

export default CreateSupportButton