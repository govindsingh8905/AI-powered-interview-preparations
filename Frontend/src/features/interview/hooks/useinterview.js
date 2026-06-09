import {getAllInterviewReports,generateInterviewReport,getInterviewReportById} from "../services/interview.api"
import {InterviewContext} from "../interview.context"
import {useContext,useEffect} from "react"
import {useParams} from "react-router"


export const useInterview =()=> {
    const context = useContext(InterviewContext)

    if(!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }
    const {loading,setLoading,report,setReport,reports,setReports} = context
     
    
const generateReport = async ({jobDescription,selfDescription,resumeFile}) => {
    let response = null
    setLoading(true)
    try {
        response = await generateInterviewReport({jobDescription,selfDescription,resumeFile})
        setReport(response.interViewReport)
    } catch (error) {
        console.error("Error generating interview report:", error)
    } finally {
        setLoading(false)
    }
    return response ? response.interViewReport : null
}

const getReportById = async (id) => {
    setLoading(true)
    try {
        const response = await getInterviewReportById(id)
        setReport(response.interviewReport)
    } catch (error) {
        console.error("Error fetching interview report:", error)
    } finally {
        setLoading(false)
    }
}

const getReports = async () => {
    setLoading(true)
    let response = null
    try {
        response = await getAllInterviewReports()
        setReports(response.interviewReports)
    } catch (error) {
        console.error("Error fetching interview reports:", error)
    } finally {
        setLoading(false)
    }
    return response ? response.interviewReports : null

}


return {loading,report,reports,generateReport,getReportById,getReports}

}



