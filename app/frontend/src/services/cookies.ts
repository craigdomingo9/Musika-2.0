import Cookies from 'js-cookie';

export function setCookie(name: string, value: string, daysTillExpiry: number = 30, path: string = '/', secure: boolean = window.location.protocol === 'https:', sameSite: 'strict' | 'lax' | 'none' = 'strict') {
  return Cookies.set(name, value, { expires: daysTillExpiry, path: path, secure: secure, sameSite: sameSite });
}

export function getCookie(name: string) {
  return Cookies.get(name);
}



