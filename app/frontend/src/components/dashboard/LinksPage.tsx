import { LinkItem } from "@/services/dashboard/links";
import PageContainer from "./PageContainer";
import Link from "next/link";
import { Separator } from "../ui/separator";



type Props = {
  links: any
}

function LinksPage({links}: Props) {
  return (
      <PageContainer>
        <div className="grid grid-cols-2 text-opacity mt-28">
        {links && (
          <>
            {links.items.map((linkItem: LinkItem) => 
              (
                <Link
                  key={linkItem.title}
                  href={linkItem.url}
                  className="h-24 w-36 sm:w-48 md:w-64 lg:w-72 lg:h-32 shadow-lg rounded-lg m-2 grid grid-cols-[30%_3%_67%] items-center text-sm hover:scale-[1.1] duration-300"
                >
                    {linkItem.icon && (
                      <>
                        <div className="text-[--baseColor] flex justify-center">
                          <linkItem.icon className="size-6" />
                        </div>
                        <Separator 
                          orientation="vertical"
                        />
                      </>
                    )}
                  <div className="flex w-full">
                    <p className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap ml-2" title={linkItem.title}>{linkItem.title}</p>
                  </div>
                </Link>
              )
            )}
          </>
        )}
        </div>
      </PageContainer>
  )
}

export default LinksPage