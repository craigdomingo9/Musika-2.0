"use client";
import createEntityStore from "@/store/dashboard/EntityStore";
import ChatDisplay from "./ChatDisplay"
import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"
import { useEffect } from "react";
import useFetchConversation from "@/services/api/dashboard/hooks/useFetchConversation";

type Props = {
  id: any,
  mode?: string,
  receiverName?: string
}

type ChatScope = {
  sender: Participant,
  receiver: Participant,
  conversation: Conversation,
}

export const useSupportChatScope = createEntityStore<ChatScope>({} as ChatScope)
export const useSupportChatAction = createEntityStore(false);


function Chat({id, mode, receiverName}: Props) {
  const { data: conversation } = useFetchConversation(id);
  const { setEntities: setChatScope } = useSupportChatScope();
  
  useEffect(() => {
    if (!conversation.participants) return;

    const receiverParticipant = conversation.participants.find(
      (participant) => participant.role !== mode?.toLowerCase()
    );
    const senderParticipant = conversation.participants.find(
      (participant) => participant.role == mode?.toLowerCase()
    )
    if (!receiverParticipant || !senderParticipant) return;

    setChatScope({
      sender: senderParticipant,
      receiver: receiverParticipant,
      conversation: conversation,
    })

  }, [conversation, mode])

  return (
    <div
      className="max-w-md page-width mx-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden"
    >
      <div className="flex flex-col h-[30rem]">
        <ChatHeader receiverName={receiverName} />
        <ChatDisplay id={id} mode={mode} />
        <ChatInput />
      </div>
    </div>
  )
}

export default Chat