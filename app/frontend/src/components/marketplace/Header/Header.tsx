"use client";
import { usePathname } from "next/navigation";
import HeaderLinksSlot from "./HeaderLinksSlot"
import HeaderTitleSlot from "./HeaderTitleSlot"
import { cn } from "@/lib/utils";

const HidePaths = ['/dashboard',]

function Header() {
  const pathName = usePathname();

  let condition = false;

  for (let path in HidePaths) {
    if (pathName.startsWith(HidePaths[path])) condition=true;
  }

  return (
    <div className={cn("h-[--headerHeight] shadow flex justify-center sticky top-0 z-20 bg-white", condition && "hidden")}>
      <div className="section-width flex justify-between items-center">
        <HeaderTitleSlot />
        <HeaderLinksSlot />
      </div>
    </div>
  )
}

export default Header
