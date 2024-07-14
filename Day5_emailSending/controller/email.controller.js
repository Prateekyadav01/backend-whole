import { Mail } from "../model/mail.model.js";
import nodemailer from "nodemailer"

export const mailSender = async(email,title,body)=>{
    try {

        const findMail = await Mail.find({email});
        if(!findMail){
            return res.status(404).json({
                message: "Email not found"
            })
        }
        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
            secure: false,
          })
        console.log("transport done");
        
          let info = await transporter.sendMail({
            from: `"Prateek" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`, 
            html: `${body}`, 
          })
          return info;
        
    } catch (error) {
        console.log("error is here", error);
    }
}

export const sendMail = async(req,res)=>{
    try {
        const {input, textArea  , email} = req.body;
        
        const newMail = await Mail.create({
            email,
            textArea,
            input
        })

        if(!newMail){
            return res.status(400).json({
                message: "Failed to send email"
            })
        }
    } catch (error) {
        
    }
}