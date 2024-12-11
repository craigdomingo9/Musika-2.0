import SearchBox from "@/components/marketplace/Search/SearchBox";
import SearchPageHeader from "@/components/marketplace/Search/Page/SearchPageHeader";
import SearchedProducts from "@/components/marketplace/Search/Page/SearchedProducts";

type Props = {
  searchParams: {
    q: string,
  }
}

async function Page({searchParams}: Props) {

  const {q} = await searchParams;

  return (
    <div className="flex place-content-center sm:mt-2">
      <div className="section-width mx-2">
        <SearchBox />
        <SearchPageHeader q={q} />
        <SearchedProducts />
      </div>
    </div>
  )
}

export default Page