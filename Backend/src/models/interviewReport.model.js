const mongoose = require('mongoose');

/**\
 * provided by the user
 * job description schema :type: string
 * resume text
 * self description 
 * 
 * - matchscore ;{
 * techinal:number 
 * 
 * }
 * 
 * provided by the ai 
 * technical question :[{
 * 
 *          question:""
 *          intention:""
 *          answer:"";
 * }]
 * behavioral question  :[{
 * {.        question:""
 *            intention:""
 *            answer:"";
 * }}]
 * skills gap :[{
 *          skill:"";
 *         severity:" "
 *         type:string,
 *            enum:["low","medium","high"]
 * }]
 * preparation plan ;[{ 
 *            day:number;
 *            focus:sring,
 *            task:[ string]
 * 
 *  }]
 */  
const technicalQuestionSchema= new mongoose.Schema({
    question:{
        type:String,
        required:[true,"technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},{
    _id:false
})
const behavioralQuestionSchema = new mongoose.Schema({
      question:{
        type:String,
        required:[true,"technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }

},{
    _id:false
})

const preparationPlanSchema= new mongoose.Schema({
     day:{
        type:Number,
        required:[true,"day is required"]

     },
     focus:{
        type:String,
        required:[true,"focus is required"]
     },
     tasks:[{
        type:String,
        required:[true,"task is required"]

     }]
})

const skillGapSchema=new mongoose.Schema({
    skill:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"severity is required"]
    }
},{
    _id:false
})

const interviewReportSchema=  new mongoose.Schema({
    jobDescription :{
        type:String,
        required:[true,"Job description is required"]

    },
    resumeText:{
        type:String,

    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalquestion: [technicalQuestionSchema],
    behavioralQuestion:[behavioralQuestionSchema],
    skillGap:[skillGapSchema],
    preparationPlan:[preparationPlanSchema]
},{
    timestamps:true
})

const interviewReportModel=mongoose.model("InterviewReport",interviewReportSchema);

module.exports= interviewReportModel;




