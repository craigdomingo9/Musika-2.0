import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Props = {
  title: string,
  href: any,
}

function SectionLink({title, href}: Props) {
  return (
    <>
    <Link href={href} className='shadow my-1 h-14 items-center px-2 rounded-lg flex justify-between min-w-full cursor-pointer hover:scale-[1.01] duration-300'>
      <div>
        <p>{title}</p>
      </div>
      <div className='text-opacity'>
        <ChevronRight />
      </div>
    </Link>
    <hr />
    </>
  )
}

export default SectionLink