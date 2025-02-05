import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function LoginLinkButton() {
  return (
    <Link href={'/login'} className='my-2 flex justify-center'>
      <Button>Login</Button>
    </Link>
  )
}

export default LoginLinkButton