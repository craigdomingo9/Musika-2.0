"use client";
import { cn } from "@/lib/utils";
import useFetchMessages from "@/services/api/dashboard/hooks/useFetchMessages";
import { useEffect, useRef } from "react";
import Loading from "@/app/dashboard/loading";
import { useSupportChatAction } from "./Chat";
import { format } from "date-fns";
import Ribbon from "@/components/dashboard/Ribbon";

type Props = {
  id: string,
  mode?: string,
}



function ChatDisplay({id, mode}: Props) {
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
      className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2 relative"
      id="chatDisplay"
      ref={chatDisplayRef}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {messages.map((message, indx, arr) => {
            const senderIsMe = message.sender.role == mode?.toLowerCase();
            console.log(message.sender.role, mode?.toLowerCase(), senderIsMe)
            const sentAtDate = new Date(message.sent_at)

            let sentAt = format(sentAtDate, "p")
            .toLowerCase()
            .split(" ")
            .join("");
            

            const transformDate = (date: string) => format(date, "dd")
            const dayChanged = (
              indx > 1 && 
              transformDate(message.sent_at) > transformDate(arr[indx - 1].sent_at)
            ) || indx == 0

            return (
              <div key={message.id}>
                {dayChanged && (
                  <div className="flex justify-center w-full sticky top-0">
                    <Ribbon className="text-center my-2 max-w-fit hover:scale-100">
                      {format(sentAtDate, "PPP")}
                    </Ribbon>
                  </div>
                )}
                <div className={cn("flex", senderIsMe && "flex-row-reverse")}>
                  <div className={cn("flex items-center gap-x-1", !senderIsMe && "flex-row-reverse")}>
                    <p className="sub-text-opacity text-[0.6rem]">
                      {!senderIsMe && "·"}
                      &nbsp;{sentAt}&nbsp;
                      {senderIsMe && "·"}
                    </p>
                    <p className={cn("text-sm rounded-lg px-3 text-white max-w-xs py-1.5", senderIsMe ? "bg-blue-500" : " bg-zinc-500")}>{message.content}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

export default ChatDisplay