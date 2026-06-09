const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()


/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self descirption
 * @access private 
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report
 * @access private
 */

interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportController)

/**
 * @route GET/api/interview/
 * @description get all interview reports of logged in user
 * @access private
 * // jitne bhi user ne report banai h usse fetch kr sakte h
 */

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportsController)

module.exports = interviewRouter