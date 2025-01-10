

export default function PageContainer(
  { 
    children, 
    className 
  }: { 
    children: React.ReactNode,
    className?: string 
  }
) {
  return (
    <div className={'flex place-content-center sm:mt-2'}>
      <div className={`w-full sm:p-3 min-w-[350px] sm:w-[600px] md:w-[700px] grid place-content-center items-center ${className}`}>
        {children}
      </div>
    </div>
  );
}