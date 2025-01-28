import PageContainer from "@/components/dashboard/PageContainer";
import Chat from "@/components/universal/Chat/Chat";

type Props = {
  searchParams: {
    id: string,
    mode: string,
    receiverName: string,
  }
}


async function page({ searchParams }: Props) {
  const {id, mode, receiverName} = await searchParams;
  

  return (
    <PageContainer>

      <Chat 
        id={id} 
        mode={mode} 
        receiverName={receiverName}
      />

    </PageContainer>
  )
}

export default page