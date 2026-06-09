require("dotenv").config()
const app = require("./src/app.js")
const  connectToDB = require("./src/config/database.js")
const { generateInterviewReport } = require("./src/services/ai.service.js")
const {resume,selfDescription,jobDescription} = require("./src/services/temp")
connectToDB()


//generateInterviewReport({resume, jobDescription, selfDescription})
app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,

    })
})



if (!process.env.VERCEL) {
    app.listen(3000,()=>{
        console.log(`server is running on port ${3000}`)
    })
}

module.exports = app



  