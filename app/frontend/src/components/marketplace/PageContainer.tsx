



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
      <div className={`section-width m-4 ${className} min-w-[350px] sm:w-[600px] md:w-[700px]`}>
        {children}
      </div>
    </div>
  );
}