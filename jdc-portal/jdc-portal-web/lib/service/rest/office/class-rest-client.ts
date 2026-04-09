import 'server-only'
import { ClassDetails, ClassForStudent, ClassItem } from "@/lib/model/dto/office";
import { ClassForm, ClassSearch } from "@/lib/model/schema/office";
import { PageResult, PAGEINFO, DataModificationResult } from "@/lib/types";

export async function search(form: ClassSearch): Promise<PageResult<ClassItem>> {
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

export async function create(form: ClassForm): Promise<DataModificationResult<string>> {
    return {
        id: "1234"
    }
}

export async function update(id: string, form: ClassForm): Promise<DataModificationResult<string>> {
    return {
        id: "1234"
    }
}

export async function findForm(id: string): Promise<ClassForm> {
    return {
        type: "Online",
        course: "1",
        startDate: "2023-01-01",
        months: 3,
        days: ["Monday", "Wednesday", "Friday"],
        timeFrom: "07:00",
        timeTo: "09:00",
        registrationFee: 50000,
        monthlyFee: 100000
    }
}

export async function findDetails(id: string): Promise<ClassDetails> {
    return {
        id: 1,
        type: "Online",
        course: "Math",
        courseLevel: "Beginner",
        startDate: "2023-01-01",
        months: 3,
        days: "Mon, Wed, Fri",
        time: "7:00 PM - 9:00 PM",
        registrationFee: 50000,
        monthlyFee: 100000,
        createdAt: "2023-01-01",
        modifiedAt: "2023-01-01",
        createdBy: "John Doe",
        modifiedBy: "John Doe"
    }
}

export async function findForStudent(studentId: any, classId: any): Promise<ClassForStudent> {
    return {
        classId: 1,
        studentId: 1,
        type: "Online",
        course: "Math",
        startDate: "2023-01-01",
        registrationFee: 50000,
        monthlyFee: 100000,
        months: 3,
        attended: 10,
        late: 0,
        absent: 2,
        leave: 0,
        lastPayment: 50000,
        paidFees: 150000
    }
}