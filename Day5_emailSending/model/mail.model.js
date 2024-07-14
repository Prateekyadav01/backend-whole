import mongoose from "mongoose";
import { emailTemplate } from "../utils/email.utils.js";
import { mailSender } from "../controller/email.controller.js";


const mailSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    textArea:{
        type:String
    },
    input:{
        type:String
    }
})

async function sendVerificationEmail(email,textArea,input){
    try {
        console.log(email,textArea,input)
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(email,textArea,input),
		);
		// console.log("Email sent successfully: ", mailResponse.response);
        console.log(mailResponse);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

mailSchema.pre('save',async function(next){
    console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.textArea, this.input);
	} 
	next();
})
export const Mail = mongoose.model("Mail", mailSchema);