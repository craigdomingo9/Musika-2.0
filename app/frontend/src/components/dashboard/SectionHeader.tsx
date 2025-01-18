import { cn } from "@/lib/utils"



type Props = {
  HeaderTitle: string,
  SubText?: string,
  Action?: JSX.Element,
  noPadding?: boolean,
  className?: string,
}

function SectionHeader({
  HeaderTitle,
  SubText,
  Action,
  noPadding,
  className,
}: Props) {
  return (
    <div className={cn("flex items-center justify-between w-full", !noPadding && "my-4", className)}>

      <div>
        <header className="text-opacity text-xl font-semibold">
          {HeaderTitle}
        </header>
        <p className="sub-text-opacity text-xs">
          {SubText}
        </p>
      </div>
      
      <div>
        {Action}
      </div>
      
    </div>
  )
}

export default SectionHeader