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

module.exports={registerUserController,loginUserController,logoutusercontroller,getMeController}

async function loginUserController(req, res) { // ye padhnaa h !!!!!!!!!!!
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid email and password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email and password"
            })
        }

        // ✅ Create token BEFORE sending response
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        // ✅ Set cookie BEFORE sending response
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })

        // ✅ Only ONE response at the very end
        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
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
 * @access public 
 * 
 */

async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User details fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}



