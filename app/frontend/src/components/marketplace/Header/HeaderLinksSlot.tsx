import CartLink from "../Links/CartLink"
import NotificationsLink from "../Links/NotificationsLink"
import ProfileLink from "../Links/ProfileLink"

function HeaderLinksSlot() {
  return (
    <div className="flex gap-4 px-2">
      <CartLink />
      <NotificationsLink />
      <ProfileLink />
    </div>
  )
}

export default HeaderLinksSlot
