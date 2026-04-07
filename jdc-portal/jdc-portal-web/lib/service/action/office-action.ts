'use server'

import {  CourseItem } from "@/lib/model/dto/anonymous";
import { ClassItem, EmployeeItem, PaymentItem,RegistrationItem,StudentItem } from "@/lib/model/dto/office";
import { ClassForm, ClassSearch, CourseForm, CourseSearch, EmployeeForm, EmployeeSearch, PaymentSearch, RegistrationSearch, StudentSearch } from "@/lib/model/schema/office";
import { DataModificationResult, PageResult } from "@/lib/types";
import * as employeeApi from "../rest/office/employee-rest-client"
import * as studentApi from "../rest/office/student-rest-client"
import * as courseApi from "../rest/office/course-rest-client"
import * as classApi from "../rest/office/class-rest-client"
import * as paymentApi from "../rest/office/payment-rest-client"
import * as registrationApi from "../rest/office/registration-rest-client"

export async function searchEmployee(form: EmployeeSearch):Promise<EmployeeItem[]> {
    return employeeApi.search(form)
}

export async function createEmployee(form: EmployeeForm): Promise<DataModificationResult<string>> {
    return employeeApi.create(form)
}

export async function searchStudent(form: StudentSearch) : Promise<PageResult<StudentItem>> {
    return await studentApi.search(form)
}

export async function searchCourse(form: CourseSearch): Promise<CourseItem[]> {
    return await courseApi.search(form)
}

export async function createCourse(form: CourseForm): Promise<DataModificationResult<string>> {
    return await courseApi.create(form)
}

export async function searchClasses(form:ClassSearch) : Promise<PageResult<ClassItem>> {
    return await classApi.search(form)
}

export async function createClass(form: ClassForm) : Promise<DataModificationResult<string>> {
    return await classApi.create(form)
}

export async function searchPayments(form:PaymentSearch) : Promise<PageResult<PaymentItem>> {
    return await paymentApi.search(form)
}

export async function searchRegistration(form:RegistrationSearch) : Promise<PageResult<RegistrationItem>> {
    return registrationApi.search(form)
}