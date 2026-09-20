import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req,res)=>{
 try{
  const {name,email,phone,role,password}=req.body;
  const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)) return res.status(400).json({error:"Invalid email format"});
  const existingUser=await User.findOne({email});
  if(existingUser) return res.status(400).json({error:"User already exists. Please login."});
  if(password.length<6) return res.status(400).json({error:"Password should be at least 6 characters long"});
  const salt=await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(password,salt);
  const newUser=new User({name,email,phone,role,password:hashedPassword});
  if(newUser){
   generateTokenAndSetCookie(newUser._id,res);
   await newUser.save();
   res.status(201).json({_id:newUser._id,name:newUser.name,email:newUser.email,phone:newUser.phone,role:newUser.role,isApproved:newUser.isApproved});
  }else return res.status(400).json({error:"Invalid User Data"});
 }catch(error){console.error("Error in signup controller:",error.message);res.status(500).json({error:"Internal Server Error"});}
};

export const login=async(req,res)=>{
 try{
  const {email,password,role}=req.body;
  const user=await User.findOne({email});
  if(!user)return res.status(400).json({error:"User not found"});
  const isPasswordCorrect=await bcrypt.compare(password,user.password);
  if(!isPasswordCorrect)return res.status(400).json({error:"Invalid Username or Password"});
  if(user.role!==role)return res.status(403).json({error:`Access denied: user role is not ${role}`});
  generateTokenAndSetCookie(user._id,res);
  res.status(200).json({_id:user._id,name:user.name,email:user.email,role:user.role});
 }catch(error){console.error("Error in Login controller: ",error.message);res.status(500).json({error:"Internal Server Error"});}
};

export const logout=async(req,res)=>{
 try{
  res.cookie("jwt","",{httpOnly:true,expires:new Date(0),sameSite:"Strict",secure:process.env.NODE_ENV==="production"});
  res.status(200).json({message:"Logged Out Successfully"});
 }catch(error){console.error("Error in logout controller:",error.message);res.status(500).json({error:"Internal Server Error"});}
};

export const checkAuth=async(req,res)=>{
 try{res.status(200).json(req.user);}
 catch(error){console.log("error in checkAuth controller",error.message);res.status(500).json({error:"Internal server error"});}
}