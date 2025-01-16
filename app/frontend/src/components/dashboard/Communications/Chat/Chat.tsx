import ChatDisplay from "./ChatDisplay"
import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"


type Props = {
  id: string,
  mode: string,
}

function Chat({id, mode}: Props) {
  return (
    <div
  className="max-w-md page-width mx-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden"
>
  <div className="flex flex-col h-[30rem]">
    <ChatHeader id={id} mode={mode} />
    <ChatDisplay id={id} mode={mode} />
    <ChatInput />
  </div>
</div>
  )
}

export default Chat