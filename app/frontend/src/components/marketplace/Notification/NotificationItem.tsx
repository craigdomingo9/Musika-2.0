import { useIsMobile } from "@/hooks/use-mobile";
import { truncationMinLength } from "@/lib/constants";
import { trunc } from "@/lib/utils";
import Link from "next/link";


type Props = {
  notification: Notification
}

function NotificationItem({notification}: Props) {
  const isMobile = useIsMobile();
  
  
  return (
    <Link href={`/notifications/${notification.id}`} className="grid items-center grid-cols-[90%_10%] shadow-md h-10 p-2 my-2 max-w-full overflow-clip">
      <p className="font-semibold text-xs opacity-60">
      {(isMobile) && (trunc(notification.message, truncationMinLength))}
      {!isMobile && notification.message}
      </p>
      <p className="sub-text flex justify-self-end">{notification.sent_at}</p>
    </Link>
  )
}

export default NotificationItem