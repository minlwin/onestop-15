import { clearAuthResult, getAccessToken, getRefreshToken, getSite, setAuthResult } from '@/lib/model/login-user'
import { redirect } from 'next/navigation'
import 'server-only'
import { es } from 'zod/locales'

export async function publicRequest(path: string, options: RequestInit = {}, params? : {[key:string] : any}) {
    const response = await fetch(url(path, params), options)

    if(!response.ok) {
        const message = await response.json()
        throw JSON.stringify({
            messages : message
        })
    }

    return response
}

export async function publicSearch(path: string, params? : {[key:string] : any}) {
    return publicRequest(path, {method: 'GET'}, params)
}

export async function securedRequest(path: string, options: RequestInit = {}, params? : {[key:string] : any}) {

    async function fetchWithToken(token: string) {
        return await fetch(url(path, params), {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': token
            }
        })
    }

    const site = await getSite()
    const accessToken = await getAccessToken()
    const refreshToken = await getRefreshToken()

    if(!accessToken 
        || !refreshToken
        || !site) {
        // LOGOUT and Login Again
        await clearAuthResult()
        redirect('/')
    }

    let response = await fetchWithToken(accessToken)

    // If Access Token Expired
    if(response.status === 408) {

        const refreshUrl = url('anonymous/auth/refresh');
        // Refresh Token
        const refreshResponse = await fetch(refreshUrl, {
            ...POST_CONFIG,
            body: JSON.stringify({
                "token" : refreshToken
            })
        })

        if(refreshResponse.ok) {
            // Update Auth Result
            const authResult = await refreshResponse.json()
            await setAuthResult(authResult, site)
            // Try Original Request Again
            response = await fetchWithToken(authResult.accessToken)
        } else {
            // LOGOUT and Login Again
            await clearAuthResult()
            const message = await refreshResponse.json()
            if(site === '/student') {
                redirect('/signin?message=' + message[0])
            } else if (site === '/office') {
                redirect('/signin/employee?message=' + message[0])
            }
        }
    }

    // Validation Error or Internal Server Error
    if(response.status == 400 
        || response.status == 500) {
        const message = await response.json()
        throw {
            messages : JSON.stringify(message),
        }
    }

    // Security Error
    else if(response.status == 401 || response.status == 403) {
        // LOGOUT and Login Again
        await clearAuthResult()
        const message = await response.json()
        if(site === '/student') {
            redirect('/signin?message=' + JSON.stringify(message))
        } else if (site === '/office') {
            redirect('/signin/employee?message=' + JSON.stringify(message))
        }
    }

    else if(!response.ok) {
        const message = await response.json()
        throw JSON.stringify({
            messages : message
        })
    }

    return response
}

export async function securedSearch(path: string, params? : {[key:string] : any}) {
    return securedRequest(path, {method: 'GET'}, params)
}

function url(path: string, params? : {[key:string] : any}) {
    const url = new URL(`${process.env.BACKEND_URL}/${path}`)

    if(params) {
        url.search = new URLSearchParams(params).toString()
    }

    return url.toString()
}

export const POST_CONFIG = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export const PUT_CONFIG = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}