import { Button } from "@/components/ui/button"
import Link from "next/link"



function LoadMoreProducts() {
  return (
    <div className="mx-4 mt-2 grid place-items-center h-14">
      <Link href={{
        pathname: '/explore',
        // query: {
        //   'is_featured': true,
        // }
      }}>
        <Button className="m-auto text-xs">See More</Button>
      </Link>
    </div>
  )
}

export default LoadMoreProducts