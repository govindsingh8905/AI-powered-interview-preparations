const{GoogleGenAI}= require("@google/genai")
const {z} = require("zod")
const {zodToJsonSchema}= require("zod-to-json-schema")


const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema= z.object({
    matchScore:z.number().describe("a score representing how well the candidate's resume and self-description match the job description, typically on a scale from 0 to 100"),
    technicalQuestions:z.array(z.object({
        question:z.string().describe("the technical question that the candidate is likely to be asked in the interview"),
        intention:z.string().describe("the intention behind asking this question, what the interviewer is trying to assess"),
        answer:z.string().describe("a sample answer to the question, demonstrating the key points that the candidate should cover in their response")
    })).describe("a list of technical questions that the candidate is likely to be asked in the interview, along with their intentions and sample answers"),
    behavioralQuestions:z.array(z.object({
        question:z.string().describe("the behavioral question that the candidate is likely to be asked in the interview"),
        intention:z.string().describe("the intention behind asking this question, what the interviewer is trying to assess"),
        answer:z.string().describe("a sample answer to the question, demonstrating the key points that the candidate should cover in their response")    
    })).describe("a list of behavioral questions that the candidate is likely to be asked in the interview, along with their intentions and sample answers"),
    skillsGap:z.array(z.object({
        skill:z.string().describe("a specific skill that the candidate is lacking or needs improvement in"),
        severity:z.enum(["low","medium","high"]).describe("the severity of the skill gap, indicating how critical it is for the candidate to address it"),
        type:z.string().describe("the type of skill gap, such as technical, soft skill, or industry-specific knowledge")
    })).describe("a list of skills gaps that the candidate has, along with their severity and type"),
    preparationPlan:z.array(z.object({
        day:z.number().describe("the day number in the preparation plan, indicating the sequence of tasks"),
        focus:z.string().describe("the main focus or theme for that day of preparation, such as a specific topic or skill area"),
        task:z.array(z.string()).describe("a list of specific tasks or activities that the candidate should complete on that day to prepare for the interview")
    })).describe("a detailed preparation plan for the candidate, outlining daily tasks and focus areas to help them effectively prepare for the interview"), 
})


async function generateInterviewReport({resume,selfDescription,jobDescription}){

    const prompt= `generate an interview report for a candidate based on the following information:

    job description: ${jobDescription}

    resume: ${resume}

    self description: ${selfDescription}`
    
    
    
const response= await ai.models.generateContent({
        model:"gemini-1.5-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseJsonSchema:zodToJsonSchema(interviewReportSchema)
        }
    })

    console.log(JSON.parse(response.text))

    return response 
        
}

module.exports = {generateInterviewReport}

