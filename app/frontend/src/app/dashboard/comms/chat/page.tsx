import Chat from "@/components/dashboard/Communications/Chat/Chat";
import PageContainer from "@/components/dashboard/PageContainer";

type Props = {
  searchParams: {
    id: string,
    mode: string,
  }
}


async function page({ searchParams }: Props) {
  const {id, mode} = await searchParams;
  

  return (
    <PageContainer>
      <Chat id={id} mode={mode} />
    </PageContainer>
  )
}

export default page