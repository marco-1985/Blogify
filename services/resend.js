const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
 async function sendResetPasswordEmail(email,fullName,resetLink){
    try{
     const response=  await resend.emails.send({
            from:"onboarding@resend.dev",
            to:"karank47417@gmail.com",
            subject:"Reset Your Password",
            html:`
            <h2>Hello ${fullName},</h2>
            <p>We received a request to reset your password.</p>
            <p>
            <a href="${resetLink}">
            Reset Password
                </a>
            </p>
            <p>This link will expire in 15 minutes.</p>
            <p>If you didn't request this,you can safely ignore this email.</p>
            `,
        });
        console.log("Resend Response:", response);
    }catch(err){
 console.log(err);
 throw err;
    }
 }
module.exports = {
    resend,
    sendResetPasswordEmail,
};