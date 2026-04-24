import 'server-only'

import { SelectOption } from "@/lib/types"
import { publicSearch } from "../client"

export async function getOptions(resource: string): Promise<SelectOption[]> {
    const response = await publicSearch(`anonymous/options/${resource}`)
    return await response.json()
}
