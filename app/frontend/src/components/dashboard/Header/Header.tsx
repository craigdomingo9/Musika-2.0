"use client";

import Breadcrumbs from "./Breadcrumbs";
import SidebarToggler from "./SidebarToggler";

function Header() {
  
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-3">

        <SidebarToggler />
        <Breadcrumbs />

      </div>
    </header>
  )
}

export default Header