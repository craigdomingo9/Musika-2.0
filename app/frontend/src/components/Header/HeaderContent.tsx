import React from 'react'
import NotificationsIcon from './NotificationsIcon'
import CartIcon from './CartIcon'




function HeaderContent() {
  return (
    <div className='flex gap-2'>
        <NotificationsIcon />
        <CartIcon />
    </div>
  )
}

export default HeaderContent
