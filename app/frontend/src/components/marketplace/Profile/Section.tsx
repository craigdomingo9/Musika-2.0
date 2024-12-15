import { cn } from "@/lib/utils"



type Props = {
  Header?: string,
  SectionContent: JSX.Element,
  className?: string,
}

function Section({Header, SectionContent, className}: Props) {
  return (
    <div className={cn(className, "grid")}>
      {Header && (
        <div className="font-semibold text-opacity">
          {Header}
        </div>
      )}
      <hr />
      <div className="py-1">
        {SectionContent}
      </div>
    </div>
  )
}

export default Section