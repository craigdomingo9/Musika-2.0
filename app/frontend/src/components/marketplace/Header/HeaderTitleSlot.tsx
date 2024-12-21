"use client";
import { usePathname } from 'next/navigation'
import HeaderTitle from './HeaderTitle';
import BackButton from '../BackButton';
import { useIsMobile } from '@/hooks/use-mobile';
import HomeButton from '../HomeButton';

const TitlePaths = ['/',]
const HomeButtonPaths = ['/b/', '/notifications', '/profile', '/cart']

function HeaderTitleSlot() {
  const pathName = usePathname();
  const isMobile = useIsMobile();
  
  const condition = TitlePaths.find(path => path == pathName);

  let homeButtonCondition = false;

  for (let path in HomeButtonPaths) {
    if (pathName.startsWith(HomeButtonPaths[path])) homeButtonCondition=true;
  }

  return (
    <div className='px-2'>
      {(condition || !isMobile) && (
        <HeaderTitle />
      )}
      {isMobile && !condition && !homeButtonCondition && (
        <BackButton />
      )}
      {homeButtonCondition && isMobile && (
        <HomeButton />
      )}
    </div>
  )
}

export default HeaderTitleSlot