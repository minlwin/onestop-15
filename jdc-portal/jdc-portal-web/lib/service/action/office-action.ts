'use server'

import {  CourseItem } from "@/lib/model/dto/anonymous";
import { ClassDetails, ClassForStudent, ClassItem, CourseDetails, EmployeeDetails, EmployeeItem, PaymentDetails, PaymentItem,RegistrationDetails,RegistrationItem,StudentDetails,StudentItem } from "@/lib/model/dto/office";
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

export async function updateEmployee(id: string, form: EmployeeForm): Promise<DataModificationResult<string>> {
    return employeeApi.update(id, form)
}

export async function findEmployeeById(id: string): Promise<EmployeeDetails> {
    return employeeApi.findById(id)
}

export async function searchStudent(form: StudentSearch) : Promise<PageResult<StudentItem>> {
    return await studentApi.search(form)
}

export async function findStudentById(id: string): Promise<StudentDetails> {
    return await studentApi.findById(id)
}

export async function findClassForStudent(studentId: any, classId: any) : Promise<ClassForStudent> {
    return await classApi.findForStudent(studentId, classId)
}

export async function searchCourse(form: CourseSearch): Promise<CourseItem[]> {
    return await courseApi.search(form)
}

export async function createCourse(form: CourseForm): Promise<DataModificationResult<string>> {
    return await courseApi.create(form)
}

export async function updateCourse(id: string, form: CourseForm): Promise<DataModificationResult<string>> {
    return await courseApi.update(id, form)
}

export async function findCourseForEdit(id: string): Promise<CourseForm> {
    return await courseApi.findForm(id)
}

export async function findCourseDetails(id: string): Promise<CourseDetails> {
    return await courseApi.findDetails(id)
}

export async function searchClasses(form:ClassSearch) : Promise<PageResult<ClassItem>> {
    return await classApi.search(form)
}

export async function createClass(form: ClassForm) : Promise<DataModificationResult<string>> {
    return await classApi.create(form)
}

export async function updateClass(id: string, form: ClassForm) : Promise<DataModificationResult<string>> {
    return await classApi.update(id, form)
}

export async function findClassForEdit(id: string) : Promise<ClassForm> {
    return await classApi.findForm(id)
}

export async function findClassDetails(id: string) : Promise<ClassDetails> {
    return await classApi.findDetails(id)
}

export async function searchPayments(form:PaymentSearch) : Promise<PageResult<PaymentItem>> {
    return await paymentApi.search(form)
}

export async function findPaymentDetails(id: any) : Promise<PaymentDetails> {
    return await paymentApi.findById(id)
}

export async function approvePayment(id: any) : Promise<void> {
    return await paymentApi.updateStatus(id, 'Approved')
}

export async function rejectPayment(id: any, reason: string) : Promise<void> {
    return await paymentApi.updateStatus(id, 'Rejected', reason)
}

export async function searchRegistration(form:RegistrationSearch) : Promise<PageResult<RegistrationItem>> {
    return registrationApi.search(form)
}

export async function findRegistrationDetails(id: any) : Promise<RegistrationDetails> {
    return registrationApi.findById(id)
}


export async function approveRegistration(id: any) : Promise<void> {
    return await registrationApi.updateStatus(id, 'Approved')
}

export async function rejectRegistration(id: any, reason: string) : Promise<void> {
    return await registrationApi.updateStatus(id, 'Rejected', reason)
}
