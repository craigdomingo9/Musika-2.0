"use client";
import { brandName } from "@/lib/constants";
import { useSupportChatAction } from "./Chat";

type Props = {
  receiverName?: string,
}


function ChatHeader({ receiverName=`${brandName} Support` }: Props) {
  const { entities: action, setEntities: setChatAction } = useSupportChatAction();

  return (
    <div className="px-4 py-3 border-b dark:border-zinc-700">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
          {receiverName}
        </h2>
        <div 
          onClick={() => setChatAction(!action)} 
          className="flex items-center gap-x-2 text-green-500 text-xs px-2 py-1 rounded-full cursor-pointer"
        >
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