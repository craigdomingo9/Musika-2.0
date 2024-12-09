"use client";
import Link from "next/link"

type Props = {
  Icon: JSX.Element,
  count?: number,
  pathName: string,
}

function IconLink({Icon, count, pathName}: Props) {

  return (
    <Link href={pathName}>
      <div className='relative'>
        {Icon}
        <p className='text-xs absolute -top-[0.12rem] text-[--baseColor] -right-1 font-semibold text-opacity'>{count}</p>
      </div>
    </Link>
  )
}

export default IconLink