import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js";


export async function register(req, res) {

    // get required variables from request body
    const { username, email, password } = req.body;

    // Check if user already exists
    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists)
        return res.status(400).json({
            message: "User with this email or username already exists",
            success: false,
            err: "User already exists"
        });

    // create an instance of a user
    const user = await userModel.create({ username, email, password })

    const emailVerificationToken = jwt.sign({
        email: user.email,
    }, process.env.JWT_SECRET)

    await sendEmail({
        to: email,
        subject: "Welcome to Nexara!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Nexara</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Nexara Team</p>
        `
    })

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}


// verification mail
export async function verifyEmail(req, res) {
    const { token } = req.query;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });

    if(!user){
        return res.status(200).json({
            message: "invalid token",
            success:false,
            err: "User not found"
        })
    }
    user.verified = true;
    await user.save();

    res.send(`
        <h1>Email Verified Successfully</h1>
        <p>Your email has been verified. You can now log in your account.</p>
        <a href="http://localhost:3000/api/auth/login">Go to Login</a>
        `)
}

