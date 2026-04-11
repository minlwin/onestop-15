import 'server-only'

import { CourseDetails, CourseItem } from '../../../model/dto/anonymous'

export async function getCourses(): Promise<CourseItem[]> {
    return [
        { id: 1, name: "Java Basic", description: "Foundation course of Java Programming Language.", hours: 75},
        { id: 2, name: "Full Stack Spring", description: "Full Stack Spring", hours: 120},
        { id: 3, name: "One Stop Java",  description: "One Stop Java", hours: 360},
        { id: 4, name: "Python Foundation", description: "Python Foundation", hours: 75},
    ]
}

export async function findById(id: number): Promise<CourseDetails> {
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
    }
}