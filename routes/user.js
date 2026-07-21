const express=require('express');
const User=require('../models/user')
const router=express.Router();
const crypto=require('crypto');
const { sendResetPasswordEmail } = require("../services/resend");
router.get('/signin',(req,res)=>{
    return res.render('signin');
});
router.get('/signup',(req,res)=>{
    return res.render('signup');
});
router.post("/signin",async(req,res)=>{
    const {email,password} = req.body;
    try{
 const token=await User.matchPasswordAndGenerateToken(email,password);
  //console.log("User",token);

  return res.cookie("token",token).redirect("/")
    }catch(error){
        return res.render("signin",{
            error:"Incorrect Email or Password",
        });
    };
 
});
router.get("/logout",(req,res)=>{
 res.clearCookie("token").redirect("/")
})
router.get('/forgot-password',(req,res)=>{
    res.render("forgotPassword");
})
router.post("/forgot-password",async(req,res)=>{
    try{
const {email}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.render("forgotPassword",{
            error:"No user found with this email."
        })
    }
    const token=crypto.randomBytes(16).toString("hex");
    user.resetPasswordToken=token;
    user.resetPasswordExpires=Date.now()+1000*60*15;
    await user.save();
    const resetLink = `${process.env.BASE_URL}/user/reset-password/${token}`;
    await sendResetPasswordEmail(user.email,user.fullName,resetLink);
    return res.send("Reset link sent successfully");
    }catch(err){
    console.log(err);
    return res.status(500).send("Internal server error");
    }
})
router.post('/signup',async(req,res)=>{
    const {fullName,email,password}=req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
});
module.exports=router;