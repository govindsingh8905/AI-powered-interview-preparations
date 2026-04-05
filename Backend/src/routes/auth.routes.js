const {Router} = require('express')
const authController= require("../controllers/auth.controller.js")
const authMiddleware=require("../middlewares/auth.middleware.js")

const authRouter =Router()

/**
 * @route post /api/auth/register
 * @description register a new user
 * @access public
 */
authRouter.post("/register",authController.registerUserController)

/**
 * @route post /api/auth/login
 * @description login username with email and password
 * @access public
 */
authRouter.post("/login",authController.loginUsercontroller)
/**
 * @route get // api/auth/logout
 * @description clear cookie,from user cookie and the token is blaclist
 * @access public 
 */
authRouter.get("/logout",authController.logoutusercontroller)
//argument handler must be a function is logoutusercontroller

/**
 * @route get /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeContoller)



module.exports= authRouter


