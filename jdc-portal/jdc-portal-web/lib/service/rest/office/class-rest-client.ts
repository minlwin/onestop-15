import 'server-only'
import { ClassItem } from "@/lib/model/dto/office";
import { ClassForm, ClassSearch } from "@/lib/model/schema/office";
import { PageResult, PAGEINFO, DataModificationResult } from "@/lib/types";

export async function search(form:ClassSearch) : Promise<PageResult<ClassItem>> {
    return {
        ...PAGEINFO,
        list: [
            {
                id: 1,
                type: "Online",
                course: "Math",
                courseLevel: "A",
                startDate: "2023-01-01",
                months: 3
            },
            {
                id: 2,
                type: "Offline",
                course: "English",
                courseLevel: "A",
                startDate: "2023-01-01",
                months: 3
            },
            {
                id: 3,
                type: "Online",
                course: "Science",
                courseLevel: "A",
                startDate: "2023-01-01",
                months: 3
            }
        ]
    }
}

export async function create(form: ClassForm) : Promise<DataModificationResult<string>> {
    return {
        id: "1234"
    }
}