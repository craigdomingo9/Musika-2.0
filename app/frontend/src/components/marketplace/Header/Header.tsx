import HeaderLinksSlot from "./HeaderLinksSlot"
import HeaderTitleSlot from "./HeaderTitleSlot"


function Header() {
  return (
    <div className="h-14 shadow md:mx- flex justify-between items-center">
      <HeaderTitleSlot />
      <HeaderLinksSlot />
    </div>
  )
}

export default Header
