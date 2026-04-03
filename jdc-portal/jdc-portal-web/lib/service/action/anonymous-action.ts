'use server'

import { ClassDetails, Course, MessageResult } from "@/lib/model/dto/anonymous"
import { ActivationForm, CheckRegistrationForm, RegistrationForm, SignInForm } from "@/lib/model/schema/anonymous"

export async function activateAction(data: ActivationForm): Promise<MessageResult> {
    return {
        message: "Your account has been activated. You can now sign in."
    }
}

export async function checkRegistrationAction(data: CheckRegistrationForm): Promise<MessageResult> {
    
    if(data.email === "rejected@example.com") {
        return {
            message: "Your registration rejected. Please check your mail box."
        }
    }

    if(data.email === "approved@example.com") {
        return {
            message: "Your registration is already approved. Please check your mail box."
        }
    }

    return {
            message: "Your registration is still reviewing. Please wait."
    }
}

export async function signInAction(data: SignInForm): Promise<MessageResult> {

    if(data.password == "office") {
        return {
            message: "Office"
        }
    }

    return {
        message: "Student"
    }
}

export async function findCourseAction(id: any):Promise<Course> {
    return {
        id: 1,
        name: "Java Basic",
        level: "Beginner",
        description: "Foundation course of Java Programming Language.",
        hours: 75,
        contents: [
            {
            id: 1,
            name: "Java Foundation",
            description: "Basics of Java programming language",
            },
            {
            id: 2,
            name: "OOP",
            description: "Object-Oriented Programming concepts",
            },
            {
            id: 3,
            name: "Spring Boot",
            description: "Build RESTful APIs with Spring Boot",
            },
        ],
        classes: [
        {
            id: 1,
            type: "Online",
            startDate: "2026-04-15",
            days: "Mon, Wed, Fri",
            time: "7:00 PM - 9:00 PM",
            months: 3,
            registrationFee: 50000,
            monthlyFee: 100000,
            },
            {
            id: 2,
            type: "On Campus",
            startDate: "2026-04-20",
            days: "Sat, Sun",
            time: "10:00 AM - 2:00 PM",
            months: 4,
            registrationFee: 70000,
            monthlyFee: 120000,
            },            
        ]
    }
}

export async function findClassAction(id: any):Promise<ClassDetails> {
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

export async function applyRegistrationAction(form: RegistrationForm): Promise<MessageResult> {
    return {
        message: "Your registration is still reviewing. We will send you an email. Please wait."
    }
}