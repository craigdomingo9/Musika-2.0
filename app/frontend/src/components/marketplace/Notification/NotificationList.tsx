"use client";
import { useEffect, useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import NotificationItem from "./NotificationItem";


type Props = {
  notifications: Notification[]
}

function NotificationList({notifications}: Props) {
  const [readNotifications, setReadNotifications] = useState<Notification[]>([]);
  const [newNotifications, setNewNotifications] = useState<Notification[]>([]);


  const [mode, setMode] = useState<"read" | "new">("new")

  useEffect(() => {
    setNewNotifications(notifications.filter(notification => !notification.is_read))
    setReadNotifications(notifications.filter(notification => notification.is_read))
  }, [mode, notifications])



  return (
    <div className="mt-2 grid">
      <div className="mb-2 sm:mb-4">
        <ToggleGroup type="single" value={mode}>
          <ToggleGroupItem className="text-opacity font-semibold" value="new" onClick={() => setMode("new")} aria-label="Toggle Unread Notifications">
            New
          </ToggleGroupItem>
          <ToggleGroupItem className="text-opacity font-semibold" value="read" onClick={() => setMode("read")} aria-label="Toggle Read Notifications">
            Read
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {mode == "new" ? newNotifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      )): (
        readNotifications.map(notification => (
          <NotificationItem key={notification.id} notification={notification} />
        ))
      )}
    </div>
  )
}

export default NotificationList