const asyncHandler=require("express-async-handler");
const userModel = require("../models/userModel");
const generateToken = require("../config/generateToken");
const registerUser= asyncHandler(async (req,res)=>{
    const {name,email,password,pic}=req.body;
    if(!name || !email || !password){
         res.status(401);
         throw new Error("Please Enter All The Fields");
    }

    const userExist=await userModel.findOne({email});
    if(userExist){
        res.status(401);
         throw new Error("User Already  Exist With Same Email ");
    }

    const user=await userModel.create({
        name,
        email,
        password,
        pic
    });
    if(user){
        res.status(200).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("User Not Found");
    }
})


const loginUser= asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(401);
         throw new Error("Please Enter All The Fields");
    }

    const user=await userModel.findOne({email});
    if(user && (await user.comparePassword(password))){
        res.status(200).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }else{
            res.status(401);
    throw new Error("Invalid Email or Password");
    }
})

const allUser=asyncHandler(async(req,res)=>{
    const keyword=req.query.search ?{
        $or:[
            {name:{$regex: req.query.search,$options:"i"}},
            {email:{$regex: req.query.search,$options:"i"}}
        ]
    }:{}
    const users=await userModel.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users);

})

module.exports={registerUser,loginUser,allUser};