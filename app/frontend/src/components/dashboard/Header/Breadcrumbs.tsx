"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getBreadCrumbs } from "@/services/dashboard/links";
import { usePathname } from "next/navigation";


function Breadcrumbs() {
  const pathName = usePathname();

  const breadcrumbs = getBreadCrumbs(pathName);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={breadcrumbs.base?.url}>
            {breadcrumbs.base?.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        {breadcrumbs.children && (

          breadcrumbs.children.map((crumb) => (
            <BreadcrumbItem key={crumb.title}>
              <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
            </BreadcrumbItem>
          ))
        )}
        
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs