import Featured from "@/components/marketplace/Featured/Featured";
import PageContainer from "@/components/marketplace/PageContainer";
import Sale from "@/components/marketplace/Sale/Sale";
import SearchBox from "@/components/marketplace/Search/SearchBox";

export default function Home() {

  
  return (
    <PageContainer>
      <SearchBox />
      <Sale />
      <Featured />
    </PageContainer>
  );
}
