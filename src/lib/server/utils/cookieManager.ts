import type { Cookies } from '@sveltejs/kit';
import type { CookieType } from '@/constants/cookie';

export function setCookie(cookies: Cookies, name: CookieType, value: string) {
	cookies.set(name, value, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true, //? Enforces HTTPS
		maxAge: 60 * 60 * 24 // a day
	});
}

export function getCookie(cookies: Cookies, name: CookieType) {
	return cookies.get(name);
}

export function clearCookie(cookies: Cookies, name: CookieType) {
	cookies.set(name, '', {
		path: '/',
		expires: new Date(0)
	});
}
