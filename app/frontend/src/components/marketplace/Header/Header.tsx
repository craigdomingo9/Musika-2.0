import HeaderLinksSlot from "./HeaderLinksSlot"
import HeaderTitleSlot from "./HeaderTitleSlot"


function Header() {
  return (
    <div className="h-14 shadow flex justify-center sticky top-0 z-20 bg-white">
      <div className="section-width flex justify-between items-center">
        <HeaderTitleSlot />
        <HeaderLinksSlot />
      </div>
    </div>
  )
}

export default Header
