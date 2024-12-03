"use client";
import { usePathname } from 'next/navigation'
import HeaderTitle from './HeaderTitle';
import BackButton from '../BackButton';

const TitlePaths = ['/']

function HeaderTitleSlot() {
  const pathName = usePathname();

  return (
    <div className='px-2'>
      {TitlePaths.find(path => path == pathName) ? (
        <HeaderTitle />
      ) : (
        <BackButton />
      )}
    </div>
  )
}

export default HeaderTitleSlot