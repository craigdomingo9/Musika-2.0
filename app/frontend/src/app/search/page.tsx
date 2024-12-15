import SearchBox from "@/components/marketplace/Search/SearchBox";
import SearchPageHeader from "@/components/marketplace/Search/Page/SearchPageHeader";
import SearchedProducts from "@/components/marketplace/Search/Page/SearchedProducts";
import PageContainer from "@/components/marketplace/PageContainer";

type Props = {
  searchParams: {
    q: string,
  }
}

async function Page({searchParams}: Props) {

  const {q} = await searchParams;

  return (
    <PageContainer>
      <SearchBox />
      <SearchPageHeader q={q} />
      <SearchedProducts />
    </PageContainer>
  )
}

export default Page