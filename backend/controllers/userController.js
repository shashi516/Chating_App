import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const register=async(req,res)=>{
   try{
    const {fullName, userName, password, confirmpassword, gender}=req.body;
    if(!fullName|| !userName ||  !password || !confirmpassword || !gender){
        return res.status(400).json({message:"All fields are required"});
    }
    if(password !== confirmpassword){
        return res.status(400).json({message:"Password should not be matched"});
    }

    const user= await User.findOne({userName});
    if(user){
        return res.status(400).json({message:"user already registered"})
    }

    const maleprofile=`https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleprofile=`https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const hashedPassword=await bcrypt.hash(password,10);

    await User.create({
        fullName,
        userName,
        password:hashedPassword,
        gender,
        profilePhoto: gender==="male"? maleprofile : femaleprofile
    });
    return res.status(201).json({
        message:"Account Created Successfully!",
        success:true  
    })
   }catch (error) {
    console.log(error); 
   }
}

export const Login=async (req,res)=>{
    try{
        const {userName, password}=req.body;
        if(!userName || !password){
            return res.status(400).json({
                message:"All fields are required!"
            });
        };
        const user= await User.findOne({userName});
        if(!user){
            return res.status(400).json({
                message:"User not found please mention correct user Details.",
                success:false
            });
        };

    const IsPasswordMatch= await bcrypt.compare(password,user.password);
    if(!IsPasswordMatch){
        return res.status(400).json({
            message:"User id or Password are incorrect please provide a vailid password",
            success:false
        });
    };
    const tokenData={
        userId:user._id
    };
    const token= await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn:'1d'});
    return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSites:'strict'}).json({
        _id:user._id,
        userName:user.userName,
        fullName:user.fullName,
        profilePhoto:user.profilePhoto
    });

    }catch(error){
        console.log(error);
    }
};

export const LogOut=async(req,res)=>{
 try{
    return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"logOut Successful!"
    })
 }catch(error){
    console.log(error);
 }
}

export const getOtherUsers= async (req,res)=>{
    try{
        const LoggedInUserId=req.id;
        const otherUsers=await User.find({_id:{$ne:LoggedInUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    }catch(error){
        console.log(error);
    }
}