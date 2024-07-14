import { Mail } from "../model/mail.model.js";
import nodemailer from "nodemailer";

export const mailSender = async (email, title, body) => {
    try {
        const findMail = await Mail.find({ email });
        if (findMail.length === 0) {
            return { status: 404, message: "Email not found" };
        }

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            secure: false,
        });

        console.log("Transporter configured");

        let info = await transporter.sendMail({
            from: `"Your Name" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        return { status: 200, info };
    } catch (error) {
        console.log("Error occurred", error);
        return { status: 500, message: "Failed to send email", error };
    }
};

export const sendMail = async (req, res) => {
    try {
        const { input, textArea, email } = req.body;

        if ([input, textArea, email].some(field => field.trim() === "")) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newMail = await Mail.create({
            email,
            textArea,
            input
        });

        if (!newMail) {
            return res.status(400).json({
                message: "Failed to save email details"
            });
        }

        const mailInfo = await mailSender(email, input, textArea);

        if (mailInfo.status !== 200) {
            return res.status(mailInfo.status).json({
                message: mailInfo.message
            });
        }

        return res.status(200).json({
            message: "Email sent successfully",
            mailDetails: {
                email: newMail.email,
                textArea: newMail.textArea,
                input: newMail.input
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred",
            error
        });
    }
};
