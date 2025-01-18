import useFetchRelationships from '@/services/api/dashboard/hooks/business/agents/useFetchRelationships'
import { useCreateConversationDialogState } from '../Buttons/CreateConversationButton';
import useFetchBusiness from '@/services/api/dashboard/hooks/business/useFetchBusiness';
import { useToast } from '@/hooks/use-toast';
import Loading from '@/app/dashboard/loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { constructBody } from '@/services/dashboard/forms/form_utils';
import CommunicationEndpoints from '@/services/api/dashboard/communications';
import { dangerToastFactory, successToastFactory } from '@/services/marketplace/toast';
import { useConversationAction } from '../BusinessConversations';




function CreateConversationDialog() {
  const { entities: action, setEntities: setConversationAction } = useConversationAction();
  const { data: partners, isLoading } = useFetchRelationships();
  const { entities: open, setEntities: setOpen } = useCreateConversationDialogState();
  const { data: business } = useFetchBusiness();
  const { toast } = useToast();
  
  
  async function createConversation(partner: Agent) {
    try {
      const conversationTitle = `${business.profile.name} and ${partner.full_name}`;
      const body = constructBody({
        conversation_type: "business_agent",
        title: conversationTitle,
      });
      
      const apiServices = new CommunicationEndpoints();
      apiServices.isOnClient(window);
      
      const response = await apiServices.createConversation(body);

      if (!response.ok) {
        return dangerToastFactory(toast, "Failed to create conversation. Try again later.");
      }

      const conversationId = (await response.data).id;
      
      const addParticipantPromises = [
        addParticipant(business.user.id, "business", conversationId),
        addParticipant(partner.user.id, "agent", conversationId),
      ];

      await Promise.all(addParticipantPromises);

      successToastFactory(toast, "Conversation created successfully.");
      setOpen(!open);
      setConversationAction(!action);
    } catch (error) {
      dangerToastFactory(toast, "Failed to create conversation. Try again later.");
      setOpen(!open);
    }
  }

  async function addParticipant(user: number, role: "business" | "agent", conversation: number) {
    const body = constructBody({ conversation, role, user });
    const response = await apiServices.addParticipants(body);

    if (!response.ok) {
      setOpen(!open);
      return dangerToastFactory(toast, "Failed to add participant. Try again later.");
    }
  }


  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {partners.map(partner => (
            <div onClick={() => createConversation(partner.agent)} key={partner.id} className="flex justify-between items-center h-14 border-b hover:scale-[1.01] cursor-pointer duration-300">
              <div className="flex items-center gap-x-3">
                <Avatar>
                  <AvatarImage 
                    src={partner.agent.profile.profile_picture} 
                    alt="partner profile picture"
                  />
                  <AvatarFallback>
                    {partner.agent.full_name.split(" ").map(str => str.charAt(0))}
                  </AvatarFallback>
                </Avatar>
                <div className="font-semibold text-opacity-mid text-sm">
                  {partner.agent.full_name}
                </div>
              </div>
              
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path className="text-opacity text-[--baseColor]" strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CreateConversationDialog