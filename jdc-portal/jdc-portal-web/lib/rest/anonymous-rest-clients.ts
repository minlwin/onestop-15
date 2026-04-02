import 'server-only'
import { CourseItem } from '../dto/anonymous'

export function getCourses(): Promise<CourseItem[]> {
    return new Promise((resolve, reject) => {
        resolve(courses)
    })
}

const courses: CourseItem[] = [
  { id: 1, name: "Java Basic", description: "Foundation course of Java Programming Language.", hours: 75},
  { id: 2, name: "Full Stack Spring", description: "Full Stack Spring", hours: 120},
  { id: 3, name: "One Stop Java",  description: "One Stop Java", hours: 360},
  { id: 4, name: "Python Foundation", description: "Python Foundation", hours: 75},
];