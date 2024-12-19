export default function FormContainer(
  { 
    children, 
    HeaderTitle 
  }: { 
    children: React.ReactNode,
    HeaderTitle?: string 
  }
) {
  return (
    <div className="shadow rounded-lg p-2 sm:w-[400px] sm:m-auto">
      <div className="text-center text-xs font-semibold mb-4">
        <p>{HeaderTitle}</p>
      </div>
        {children}
    </div>
  );
}