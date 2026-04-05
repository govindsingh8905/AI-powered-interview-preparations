const userModel = require("../models/user.model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenblacklistmodel  = require("../models/blacklist.model.js")

/**
 * @route POST /api/autj/register
 * @description register a new user
 * @access public
 */
// register controller donee
async function registerUserController(req,res){  // 
const {username,email,password}=req.body
if(!username || !email|| !password){
    return res.status(400).json({
        message:"please provide username,email and password"
    })
}
const isUserAlreadyExists = await userModel.findOne({ // business logic mvc pattern 
    $or: [{username},{email}] // haar ek object ek condition ke denote krti h 
    // agar koi username milta h toh ye check krna pdega ki usrname exist krta h ya nhi 
})

if(isUserAlreadyExists){

    return res.status(400).json({
        message:"Account already exists with this email address or username"

    })
}
const hash = await bcrypt.hash(password,10)

const user = await userModel.create({
    username,
    email,
    password:hash
 
})

const token =jwt.sign(
    {id:user._id,username:user.username},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)

res.cookie("token",token)

res.status(201).json({
    message:"user regiter succesfully!",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
})



}

/**
 * @name loginUsercontroller
 * @description login a user,expect. email and password in the request body
 * @access public
 */

module.exports={registerUserController,loginUsercontroller,logoutusercontroller,getMeContoller}

async function loginUsercontroller(req,res){

    const{email,password}=req.body
    const user = await userModel.findOne({email})


    if(!user){
        return res.status(400).json({
            message:"Invalid email and password"
        })    
    }

    const isPassowrdValid= await bcrypt.compare(password, user.password) // ek password--> jo request ki body se aayega 
 // ek password--> jo request ki body se aayega 
    // user.password --> jo password database se aayega 

    

    if(!isPassowrdValid){
        return res.status(400).json({
            message:"Invalid email and Password"
        })
    }

    res.cookie("token",token)
    res.status(200).json({
        message:"user login successfully"
    })
    
    
    const token =jwt.sign(
    {id:user._id,username:user.username},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)

res.cookie("token",token)
res.status(200).json({
    message:"user loggedIn successfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
})

}
/**
 * @name logoutusercontroller
 * @description clear token from user cookie and the token in blacklist
 * @access public
 */
async function logoutusercontroller(req,res){
    const token = req.cookies.token
    if(token){
        await tokenblacklistmodel.create({token})

    }
    res.clearCookie("token") // clearcookie--> all cookie has been clear out 

    res.status(200).json({
        message:"user logged out successfully"
    }) 
}

/**
 * @name getMeContoller
 * @description get the current logged in user details 
 * @access private
 * 
 */

async function getMeContoller(req,res){
    const user = await userModel.findById(req.user.id) // user.id --> decoded 
    res.status(200).json({
        message:"user details fetched successfully",
        user:{
            id: user._id,
            username:user.username,
            email:user.email
        }


    })
}


