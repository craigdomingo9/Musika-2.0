"use client";
import { ChangeEvent, useState } from "react"
import { Input } from "../ui/input"
import searchProducts from "@/lib/utils/Search/searchProducts";
import SearchAutoComplete from "./SearchAutoComplete";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


const formSchema = z.object({
    query: z.string().min(1, {
      message: "Query must not be empty.",
    }),
})

function SearchInput() {
    const [productData, setProductData] = useState<SearchResult[]>([])
    const [showAutoComplete, setshowAutoComplete] = useState<boolean>(false)

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value

        if (searchTerm) {
            search(searchTerm);
            setshowAutoComplete(true);
        } else {
            setshowAutoComplete(false);
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          query: "",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }
    
    const search = async (query: string) => {
        setProductData(await searchProducts(query))
    }

    return (
        <div className="grid relative">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="query"
                        render={({ field: { onChange } }) => (
                            <FormItem>
                            <FormControl className="relative">
                                <Input 
                                    type="text" className="mt-12 text-sm rounded-2xl" 
                                    onChange={(e) => {
                                        form.setValue("query", e.target.value);
                                        onChange();
                                    }} 
                                    id="search" 
                                    placeholder="Search..." 
                                    />

                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </form>
            </Form>
            {showAutoComplete && <SearchAutoComplete data={productData} />}
            
        </div>
    )
}

export default SearchInput
