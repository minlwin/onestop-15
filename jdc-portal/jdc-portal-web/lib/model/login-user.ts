import 'server-only'
import { AuthResult } from './dto/anonymous';
import { cookies } from 'next/headers';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export async function setAuthResult(authResult: AuthResult) {
    const {accessToken, refreshToken, ...user} = authResult
    const cookieStore = await cookies()

    const options:Partial<ResponseCookie> = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60
    }

    cookieStore.set('accessToken', accessToken, options)
    cookieStore.set('refreshToken', refreshToken, options)
    cookieStore.set('user', JSON.stringify(user), options)
}

export async function clearAuthResult() {
    const cookieStore = await cookies()
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
    cookieStore.delete('user')
}

export async function getAccessToken() {
    const cookieStore = await cookies()
    return cookieStore.get('accessToken')?.value
}

export async function getRefreshToken() {
    const cookieStore = await cookies()
    return cookieStore.get('refreshToken')?.value
}

export async function getUser() {
    const cookieStore = await cookies()
    return cookieStore.get('user')?.value
}