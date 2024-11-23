"use client";
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
import Link from "next/link";



type Props = {
    data: SearchResult[]
}


function SearchAutoComplete({data}: Props) {

  return (
    <>
        <Card className="mt-2 absolute top-full w-full z-50">
            <CardContent className="grid items-center gap-2 p-4">
                {data.map((result) => (
                    <Link className="" href={{
                        pathname: "/product",
                        query: {
                            id: result.id
                        }
                    }} key={result.id}>
                        <p>
                            {result.name}
                        </p>
                    </Link>
                ))}
                {data.length == 0 && (
                    <p className="text-center text-sm">No results.</p>
                )}
            </CardContent>
        </Card>
    </>
  )
}

export default SearchAutoComplete
