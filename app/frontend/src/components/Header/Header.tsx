import AppSideBarTrigger from '../sidebar/AppSideBarTrigger'
import HeaderContent from './HeaderContent'

function Header() {
  return (
    <div className='flex justify-between min-w-full'>
        <AppSideBarTrigger />
        <HeaderContent />
    </div>
  )
}

export default Header
