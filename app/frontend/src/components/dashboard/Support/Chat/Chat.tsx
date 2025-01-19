import ChatDisplay from "./ChatDisplay"
import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"



type Props = {
  id: any,
}

function Chat({id}: Props) {
  return (
    <div
      className="max-w-md page-width mx-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden"
    >
      <div className="flex flex-col h-[30rem]">
        <ChatHeader id={id} />
        <ChatDisplay id={id} />
        <ChatInput />
      </div>
    </div>
  )
}

export default Chat