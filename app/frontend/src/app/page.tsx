import FeaturedProducts from "@/components/Products/FeaturedProducts";
import SearchBar from "@/components/Search/SearchBar";

export default function Home() {
  return (
    <div>
        <SearchBar />
        <FeaturedProducts />
    </div>
  );
}
