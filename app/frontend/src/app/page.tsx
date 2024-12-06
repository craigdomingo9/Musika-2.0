import Featured from "@/components/marketplace/Featured/Featured";
import Sale from "@/components/marketplace/Sale/Sale";
import SearchBox from "@/components/marketplace/Search/SearchBox";

export default function Home() {

  
  return (
    <main className="mx-2">
      <SearchBox />
      <Sale />
      <Featured />
    </main>
  );
}
