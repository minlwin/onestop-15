import 'server-only'

import { ClassDetails } from "@/lib/model/dto/anonymous";

export async function findById(id: any):Promise<ClassDetails> {
    return {
        id: 1,
        type : "Online",
        startDate : "2026-04-15",
        days: "Mon, Wed, Fri",
        time: "7:00 PM - 9:00 PM",
        months: 3,
        registrationFee: 50000,
        monthlyFee: 100000,
        course: {
            id: 1,
            name: "Java Foundation",
            description: "Basics of Java programming language",
        }
    }
}