import { exploreTitle } from '@/lib/constants'
import Link from 'next/link'

type Props = {
  sectionTitle: string,
  showExplore?: boolean,
}

function SectionHeader({sectionTitle, showExplore}: Props) {
  return (
    <div className='flex justify-between p-2 sm:mx-4'>
      <p className='font-semibold'>{sectionTitle}</p>
      {showExplore && (
        <Link 
        className='flex text-xs items-center place-content-center'
        href={{
          pathname: '/explore',
        }}>
          <p className='underline'>{exploreTitle}</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      )}
    </div>
  )
}

export default SectionHeader