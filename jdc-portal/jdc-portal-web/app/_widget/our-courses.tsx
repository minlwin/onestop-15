import { getCourses } from "@/lib/service/rest/anonymous/courses-rest-client";
import CourseItemWidget from "./course-item-widget";

export default async function OurCourses() {
    const courses = await getCourses();
    return (
        <div className="py-16 px-6 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-10">Our Courses</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {courses.map((course, index) => (
                    <CourseItemWidget key={index} data={course} />
                ))}
            </div>
        </div>
    )
}