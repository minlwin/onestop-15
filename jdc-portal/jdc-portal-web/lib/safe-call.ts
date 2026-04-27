import { ApplicationError } from "./model/dto/anonymous"
import { toast } from "sonner"

export async function safeCall(action: () => Promise<any>) {
  try {
    await action()
  } catch (error: any) {

    if (error.message && error.message.startsWith('{"type":"Client"')) {
        const appError: ApplicationError = JSON.parse(error.message)
        toast("Message", {
            description: appError.messages
        })
    } else {
      // Bug && Server Error
      throw error
    }
  }
}