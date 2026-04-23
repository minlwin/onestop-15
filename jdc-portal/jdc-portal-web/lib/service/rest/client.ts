import { clearAuthResult, getAccessToken, getRefreshToken, setAuthResult } from '@/lib/model/login-user'
import 'server-only'

export async function publicRequest(path: string, options: RequestInit = {}, params? : {[key:string] : any}) {
    const response = await fetch(url(path, params), options)

    if(!response.ok) {
        const message = response.json()
        throw JSON.stringify(message)
    }

    return response
}

export async function publicSearch(path: string, params? : {[key:string] : any}) {
    return publicRequest(path, {method: 'GET'}, params)
}

export async function securedRequest(path: string, options: RequestInit = {}, params? : {[key:string] : any}) {
    let response : Response | undefined

    async function fetchWithToken(token: string) {
        return await fetch(url(path, params), {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': token
            }
        })
    }

    const accessToken = await getAccessToken()

    if(!accessToken) {
        // LOGOUT and Login Again
        await clearAuthResult()
        throw "Access Token Not Found"
    }

    response = await fetchWithToken(accessToken)

    // If Access Token Expired
    if(response.status === 408) {
        const refreshToken = await getRefreshToken()

        if(!refreshToken) {
            // LOGOUT and Login Again
            await clearAuthResult()
            throw "Refresh Token Not Found"
        }

        // Refresh Token
        const refreshResponse = await publicRequest('/anonymous/auth/refresh', {
            ...POST_CONFIG,
            body: JSON.stringify({
                "token" : refreshToken
            })
        })

        if(!refreshResponse.ok) {
            // LOGOUT and Login Again
            await clearAuthResult()
            const message = await response.json()
            throw JSON.stringify(message)
        }

        // Update Auth Result
        const authResult = await refreshResponse.json()
        await setAuthResult(authResult)

        // Try Original Request Again
        response = await fetchWithToken(authResult.accessToken)
    }

    // There is no response
    if(!response) {
        throw "There is no response"
    }

    // Authentication Error
    if(response.status == 401 || response.status == 403) {
        // LOGOUT and Login Again
        await clearAuthResult()
        const message = await response.json()
        throw JSON.stringify(message)
    }

    // Validation Error
    if(response.status == 400) {
        const message = await response.json()
        throw JSON.stringify(message)
    }

    // Internal Server Error
    if(response.status == 500) {
        const message = await response.json()
        throw JSON.stringify(message)
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