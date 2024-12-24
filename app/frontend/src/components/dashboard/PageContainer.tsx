

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
      <div className={`w-full border p-3 ${className}`}>
        {children}
      </div>
    </div>
  );
}