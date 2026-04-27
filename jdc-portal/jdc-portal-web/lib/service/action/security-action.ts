'use server'

import { clearAuthResult, getSite, getUser } from "@/lib/model/login-user"

export async function logoutAction() {
    await clearAuthResult()
}

export async function getLoginSite() {
    const site = await getSite()
    const user = await getUser()
    if (site && user) {
        return site
    }
}

export async function navigate(path: string) {

}