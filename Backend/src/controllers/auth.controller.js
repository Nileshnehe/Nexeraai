import userModel from "../models/user.model.js"
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



    await sendEmail({
        to: email,
        subject: "Welcome to Nexara!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Nexara</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Nexara Team</p>
        `
    })
}

