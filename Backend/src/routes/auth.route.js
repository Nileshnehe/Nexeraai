import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { register, verifyEmail, login, getMe } from "../controllers/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
const authRouter = Router();


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, register);

/**
 * @route POST /api/auth/login
 * @desc Login user and return jwt token
 * @access Public  
 * @body {  email, password }
 */
authRouter.post("/login", loginValidator, login )


/**
 * @desc Get current logged in user's details
 * @route GET /api/auth/get-me
 * @access Private  
 */
authRouter.get("/get-me", authUser, getMe)


/**
 * @route GET /api/auth/login
 * @desc verify user email
 * @access Public
 * @query { token }
 */
authRouter.get('/verify-email', verifyEmail )

export default authRouter;

