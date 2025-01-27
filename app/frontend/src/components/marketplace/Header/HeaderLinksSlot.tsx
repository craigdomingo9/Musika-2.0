import CartLink from "../Links/CartLink"
import DashboardLink from "../Links/DashboardLink"
import NotificationsLink from "../Links/NotificationsLink"
import ProfileLink from "../Links/ProfileLink"

function HeaderLinksSlot() {
  return (
    <div className="flex gap-4">
      <DashboardLink />
      <CartLink />
      <NotificationsLink />
      <ProfileLink />
    </div>
  )
}

export default HeaderLinksSlot
