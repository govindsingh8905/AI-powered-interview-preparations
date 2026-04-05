const jwt = require("jsonwebtoken")
const tokenblacklistmodel = require("../models/blacklist.model.js")
async function authUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token not provided."
        })
    }

    const isTokenBlacklisted= await tokenblacklistmodel.findOne({
        token
    })
    if(isTokenBlacklisted){ // check krega agar token aa gya h toh token blacklist toh nhi hna !!!
        return res.status(401).json({
            message:"token is invalid"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        req.user=decoded
        next()

    } catch (error) {
        return res.status(401).json({
            message:"invalid token"
        })
    }
    // jwt_verify kya krta h --> token verify krne liye aur uss token se data nikalne ke liye
    
    // jwt_verify--> signature part ko check krti h krti h agar token galat hota h ya token expire hota h toh 
}
module.exports={authUser}