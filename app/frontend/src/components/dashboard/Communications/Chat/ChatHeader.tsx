"use client";
import Loading from "@/app/dashboard/loading";
import { agentMode } from "@/lib/dashboard/constants";
import useFetchConversation from "@/services/api/dashboard/hooks/useFetchConversation"
import createEntityStore from "@/store/dashboard/EntityStore";
import { useEffect } from "react";

type Props = {
  id: string,
  mode: string,
}

type ChatScope = {
  sender: Participant,
  receiver: Participant,
  conversation: Conversation,
}

export const useChatScope = createEntityStore<ChatScope>({} as ChatScope)
export const useChatAction = createEntityStore(false);


function ChatHeader({id, mode}: Props) {
  const { entities: chatScope, setEntities: setChatScope } = useChatScope();
  const { data: conversation, isLoading } = useFetchConversation(id);
  const { entities: action, setEntities: setChatAction } = useChatAction();
  
  
  useEffect(() => {
    if (!conversation.participants) return;

    const receiverParticipant = conversation.participants.find(
      (participant) => participant.role !== mode
    );
    const senderParticipant = conversation.participants.find(
      (participant) => participant.role == mode
    )
    if (!receiverParticipant || !senderParticipant) return;

    setChatScope({
      sender: senderParticipant,
      receiver: receiverParticipant,
      conversation: conversation,
    })

  }, [conversation, mode])

  if (isLoading) return <Loading />

  if (!chatScope.receiver) return null;

  const receiverName =
    mode == agentMode().toLowerCase()
      ? chatScope.receiver.user.business_profile?.profile.name
      : chatScope.receiver.user.agent_profile?.full_name;


  return (
    <div className="px-4 py-3 border-b dark:border-zinc-700">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
          {receiverName}
        </h2>
        <div onClick={() => setChatAction(!action)} className="flex items-center gap-x-2 text-green-500 text-xs px-2 py-1 rounded-full cursor-pointer">
          Refresh
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader 