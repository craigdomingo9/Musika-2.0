import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Props = {
  title: string,
  href: any,
}

function SectionLink({title, href}: Props) {
  return (
    <Link href={href} className='flex justify-between text-opacity font-normal shadow-md p-2 rounded my-2 hover:scale-[1.025]'>
      <div>
        <p>{title}</p>
      </div>
      <div className='text-opacity'>
        <ChevronRight />
      </div>
    </Link>
  )
}

export default SectionLink