"use client";
import { Button } from '@/components/ui/button'
import useUserProfile from '@/services/api/marketplace/hooks/useUserProfile'
import { removeCookie } from '@/services/cookies';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

function LoginLinkButton() {
  const { data: user } = useUserProfile();
  const router = useRouter();

  async function logout() {
    removeCookie("uuid");
    removeCookie("token");
    router.push('/');
  }

  return (
    <>
    {user.is_anonymous ? (
      <Link href={'/login'} className='my-2 flex justify-center'>
        <Button>Login</Button>
      </Link>
    ) : (
      <div className='my-2 flex justify-center'>
        <Button 
          variant={"destructive"}
          onClick={logout}
          >
            Logout
          </Button>
      </div>
    )}
    </>
  )
}

export default LoginLinkButton