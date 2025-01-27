import { cn } from "@/lib/utils"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  className?: string,
}

export const ListItemClassName = "h-16 my-1 flex justify-between items-center text-sm shadow mt-1 rounded-lg hover:scale-[1.01] duration-300 cursor-pointer"

function ListItem({
  children,
  className,
  ...props
}: Props) {
  return (
    <div {...props} className={cn(ListItemClassName, className)}>
      {children}
    </div>
  )
}

export default ListItem