"use client";
import { usePathname } from 'next/navigation'
import HeaderTitle from './HeaderTitle';
import BackButton from '../BackButton';
import { useIsMobile } from '@/hooks/use-mobile';

const TitlePaths = ['/']

function HeaderTitleSlot() {
  const pathName = usePathname();
  const isMobile = useIsMobile();
  
  const condition = TitlePaths.find(path => path == pathName);

  return (
    <div className='px-2'>
      {(condition || !isMobile) && (
        <HeaderTitle />
      )}
      {isMobile && !condition && (
        <BackButton />
      )}
    </div>
  )
}

export default HeaderTitleSlot