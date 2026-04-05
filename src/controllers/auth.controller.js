const userModel = require("../models/user.model.js")
/**
 * @route POST /api/autj/register
 * @description register a new user
 * @access public
 */

async function registerUserController(req,res){
const {username,email,password}=req.body
if(!username || !email|| !password){
    return res.status(400).json({
        message:"please provide username,emailand password"
    })
}
const isUserAlreadyExists = await userModel.findOne({ // business logic mvc pattern 
    $or: [{username},{email}]
})
}

module.exports={registerUserController}