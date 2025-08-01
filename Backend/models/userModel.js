const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:{type:String,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},

},{timestamps:true});

userSchema.pre("save", async function(next){
    if(!this.isModified){
        next();
    }
    const salt= await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
};

const userModel=mongoose.model("User",userSchema);


module.exports=userModel;