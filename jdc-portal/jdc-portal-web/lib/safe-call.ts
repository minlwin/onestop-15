'use client'

import { useRouter } from "next/navigation"
import { ApplicationError } from "./model/dto/anonymous"
import { toast } from "sonner"

export async function safeCall(action: () => Promise<any>) {
  try {
    await action()
  } catch (error: any) {

    if (error.message === "NEXT_REDIRECT") {
      return
    }

    if (error.message) {
        const appError: ApplicationError = JSON.parse(error.message)
        toast("Message", {
            description: appError.messages
        })
    } else {
      // Bug
      throw error
    }
  }
}