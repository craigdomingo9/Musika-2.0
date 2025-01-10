import { cn } from "@/lib/utils";


interface RibbonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Ribbon({ children, className, ...rest }: RibbonProps) {
  return (
    <div 
      className={cn(`bg-orange-100 w-full p-2 text-xs text-opacity-90 rounded-sm text-slate-600 shadow cursor-pointer hover:scale-[1.01] duration-300`, className)}
      {...rest} 
    >
      {children}
    </div>
  );
};

export default Ribbon;