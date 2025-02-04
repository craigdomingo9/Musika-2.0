import { LinkItem } from "@/services/dashboard/links";
import PageContainer from "./PageContainer";
import Link from "next/link";



type Props = {
  links: any
}

function LinksPage({links}: Props) {
  return (
      <PageContainer>
        <div className="grid grid-cols-2 text-opacity mt-28">
        {links && (
          <>
            {links.items.map((linkItem: LinkItem) => {
              const iconElement = linkItem.icon;
              return (
                <Link
                  key={linkItem.title}
                  href={linkItem.url}
                  className="h-24 w-36 sm:w-48 shadow-lg rounded-lg m-2 flex items-center justify-center text-sm hover:scale-[1.1] duration-300"
                >
                  <div>
                    {iconElement}
                  </div>
                  <p>{linkItem.title}</p>
                </Link>
              )
            })}
          </>
        )}
        </div>
      </PageContainer>
  )
}

export default LinksPage