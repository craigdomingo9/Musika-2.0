"use client";
import { cn } from "@/lib/utils";
import useFetchMessages from "@/services/api/dashboard/hooks/useFetchMessages";
import { useSupportChatAction } from "./ChatHeader";
import { useEffect, useRef } from "react";

type Props = {
  id: string,
}



function ChatDisplay({id}: Props) {
  const { entities: action } = useSupportChatAction();
  const { data: messages, isLoading } = useFetchMessages(id, action);
  const chatDisplayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatDisplayRef.current && messages.length > 0) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2"
      id="chatDisplay"
      ref={chatDisplayRef}
    >
      {messages.map(message => {
        const senderIsMe = message.sender.role !== "platform";

        return (
          <div key={message.id} className={cn("text-sm rounded-lg px-3 text-white max-w-xs py-1.5", senderIsMe ? "self-start bg-zinc-500" : "self-end bg-blue-500")}>
            {message.content}
          </div>
        )
      })}
    </div>
  )
}

export default ChatDisplay