import HeaderLinksSlot from "./HeaderLinksSlot"
import HeaderTitleSlot from "./HeaderTitleSlot"


function Header() {
  return (
    <div className="h-14 shadow flex justify-center">
      <div className="section-width flex justify-between items-center">
        <HeaderTitleSlot />
        <HeaderLinksSlot />
      </div>
    </div>
  )
}

export default Header
