"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link";
import { Separator } from "../ui/separator";



type Props = {
    data: SearchResult[]
}


function SearchAutoComplete({data}: Props) {
    console.log(data)

  return (
    <>
        <Card className="mt-2">
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
            </CardContent>
        </Card>
    </>
  )
}

export default SearchAutoComplete
