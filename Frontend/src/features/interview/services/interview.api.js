import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://ai-powered-interview-preparations.vercel.app/",
    withCredentials:true,
})

/**
 * @description service to generate interview report based on user self description,resume,job description
 */

export const generateInterviewReport= async ({resumeFile, selfDescription, jobDescription}) => {
    const formData = new FormData()
    formData.append("resume", resumeFile)
    formData.append("selfDescription", selfDescription)
    formData.append("jobDescription", jobDescription)

    const response = await api.post("/api/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}
/**
 * 
 * @description service to get interview report by ID
 */
export const getInterviewReportById=async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data
}
/**
 * 
 * @description  servie to get all interview report of logged in user
 */
export const getAllInterviewReports=async () => {
    const response = await  api.get("/api/interview/")
    return response.data
}