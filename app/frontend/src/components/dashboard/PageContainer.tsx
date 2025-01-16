

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
      <div className={`w-full sm:p-3 page-width grid place-content-center items-center ${className}`}>
        {children}
      </div>
    </div>
  );
}