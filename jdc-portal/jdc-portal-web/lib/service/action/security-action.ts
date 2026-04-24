'use server'

import { clearAuthResult, getSite, getUser } from "@/lib/model/login-user"

export async function logoutAction() {
    await clearAuthResult()
}

export async function getLoginSite() {
    return await getSite()
}

export async function navigate(path: string) {

}