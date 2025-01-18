"use client";
import { useToast } from "@/hooks/use-toast";
import CommunicationEndpoints from "@/services/api/dashboard/communications"
import { constructBody } from "@/services/dashboard/forms/form_utils";
import { dangerToastFactory } from "@/services/marketplace/toast";
import { useState } from "react";
import { useChatAction, useChatScope } from "./ChatHeader";





function ChatInput() {
  const { entities: action, setEntities: setChatAction } = useChatAction();
  const { entities: chatScope } = useChatScope();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };
  
  async function sendMessage() {
    setIsSending(true)
    try {
      const apiServices = new CommunicationEndpoints();
      apiServices.isOnClient(window);
      
      const values = {
        content: message,
        conversation: chatScope.conversation.id,
        sender: chatScope.sender.id,
      }
      const body = constructBody(values);

      const response = await apiServices.sendMessage(body);

      if (!response.ok) {
        console.log("res: ", response.data)
        dangerToastFactory(toast, "Message failed to send. Please tyr again later.")
      }
      
      setChatAction(!action);
    } catch (error) {
      console.log(error)
      dangerToastFactory(toast, "Message failed to send. Please tyr again later.")
    } finally {
      setIsSending(false);
      setMessage("");
    }
  }

  return (
    <div className="px-3 py-2 border-t dark:border-zinc-700">
      <div className="flex gap-2">
        <input
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
          type="text"
          onKeyDown={handleKeyPress}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
          disabled={isSending}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ChatInput