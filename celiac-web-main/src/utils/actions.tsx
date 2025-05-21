'use server'

import { fetchAbout, fetchAboutDisease, fetchAbouttreatment, fetchBmi, fetchBoardMembers, fetchBoardPdf, fetchFAQ, fetchHome, fetchPatientAwareness } from "@/api/axiosApi/Home"

export async function fetchHomeServerAction() {
    const data = await fetchHome()
    return data
}
export async function fetchAboutServerAction() {
    const data = await fetchAbout()
    return data
}
export async function fetchBoardMembersServerAction() {
    const data = await fetchBoardMembers()
    return data
}
export async function fetchBoardPdfServerAction() {
    const data = await fetchBoardPdf()
    return data
}
export async function fetchBmiServerAction() {
    const data = await fetchBmi()
    return data
}
export async function fetchAboutDiseaseServerAction() {
    const data = await fetchAboutDisease()
    return data
}
export async function fetchAboutTreatmentServerAction() {
    const data = await fetchAbouttreatment()
    return data
}
export async function fetchFAQServerAction() {
    const data = await fetchFAQ()
    return data
}
export async function fetchPatientAwarenessServerAction() {
    const data = await fetchPatientAwareness()
    return data
}