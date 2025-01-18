import Loading from "@/app/dashboard/loading";
import { Button } from "@/components/ui/button"
import AnalyticsEndpoints from "@/services/api/dashboard/analytics";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react"
import { useAssignedProductMutation } from "../AssignedProduct";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useFetchLeadSources from "@/services/api/dashboard/hooks/agent/assigned/useFetchLeadSources";
import { trunc } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { successToast } from "@/services/marketplace/toast";
import { useIsMobile } from "@/hooks/use-mobile";



function CreateLinksButton() {
  const { data: sources, isLoading} = useFetchLeadSources();
  const [selectedSource, setSelectedSource] = useState("");
  const [link, setLink] = useState("");
  const { entities: {object: assigned} } = useAssignedProductMutation();
  const { toast } = useToast();
  const isMobile = useIsMobile();



  function createLink() {
    const urlObject = new URL(window.location.href);
    const baseUrl = urlObject.origin;

    const productParam = `/product?id=${assigned?.product.id}&`;
    const agentParam = `ag=${assigned?.agent.code}&`;
    const srcParam = `src=${selectedSource}`;

    setLink(baseUrl + productParam + agentParam + srcParam);
  }

  useEffect(() => {
    if (!selectedSource) setSelectedSource(sources[0]?.short_name);
    
    createLink();
  }, [selectedSource, sources])

  async function copyLink() {
    await navigator.clipboard.writeText(link);
    successToast(toast, "Link", "copied")
  }


  return (
    <div className="my-4 w-full">

      {isLoading && (
        <Loading />
      )}

      {sources.length > 0 && (
        <div className="flex flex-col justify-center items-center">
          <p className="text-center text-xs font-semibold text-opacity my-4">Select and copy a link for the specified platform.</p>
          <Select
            value={selectedSource} 
            onValueChange={(value) => setSelectedSource(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose Link" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Source</SelectLabel>
                {sources.map(src => (
                  <SelectItem 
                    key={src.short_name} 
                    value={src.short_name}
                  >
                    {src.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedSource && (
            <div className="flex items-center">
              <div className="underline text-[0.65rem]">
                {isMobile ? trunc(link, 30) : link}
              </div>
              <Button onClick={copyLink} className="m-2 size-10 my-4">
                <Copy />
              </Button>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default CreateLinksButton