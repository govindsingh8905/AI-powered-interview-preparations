if (typeof global.DOMMatrix === "undefined") {
  global.DOMMatrix = class DOMMatrix {};
}
if (typeof global.ImageData === "undefined") {
  global.ImageData = class ImageData {};
}
if (typeof global.Path2D === "undefined") {
  global.Path2D = class Path2D {};
}

const pdfParse = require("pdf-parse")
const { generateInterviewReport } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")



async function generateInterviewReportController(req,res){
    try {
        let resumeText = ""
        if (req.file) {
            const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
            resumeText = resumeContent.text || ""
        }

        const {selfDescription, jobDescription} = req.body || {}

        if (!jobDescription) {
            return res.status(400).json({ message: "Job description is required" })
        }
        if (!resumeText && !selfDescription) {
            return res.status(400).json({ message: "Either resume or self description is required" })
        }

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        const interViewReport = await interviewReportModel.create({ // store in db 
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })

        res.status(201).json({
            message: "interview report generated successfully",
            interViewReport
        })
    } catch (error) {
        console.error("Error generating interview report:", error)
        res.status(500).json({
            message: "Error generating interview report",
            error: error.message
        })
    }
}

/**
 * @description Get a specific interview report by ID
 */

async function getInterviewReportController(req,res){
    try {
        const { interviewId } = req.params

        const interviewReport = await interviewReportModel.findById(interviewId)

        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" })
        }

        res.status(200).json({ 
            message:"Interview report found",
            interviewReport 
        })
    } catch (error) {
        console.error("Error fetching interview report:", error)
        res.status(500).json({
            message: "Error fetching interview report",
            error: error.message
        })
    }
}

/**
 * @route GET/api/interview/
 * @description controller to get all interview reports of loggd in user .
 * 
 */
async function getAllInterviewReportsController(req,res){
    try {
        const interviewReports = await (await interviewReportModel.find({ user: req.user.id })).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan ")

        res.status(200).json({ 
            message:"Interview reports found",
            interviewReports 
        })
    } catch (error) {
        console.error("Error fetching interview reports:", error)
        res.status(500).json({
            message: "Error fetching interview reports",
            error: error.message
        })
    }
}

module.exports ={generateInterviewReportController, getInterviewReportController, getAllInterviewReportsController}