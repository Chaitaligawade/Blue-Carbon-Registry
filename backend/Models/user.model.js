import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
 name:{type:String,required:true,trim:true},
 email:{type:String,required:true,unique:true,lowercase:true},
 phone:{type:String},
 role:{type:String,enum:["NGO","Verifier","Admin"],default:"NGO"},
 password:{type:String,required:true,minlength:6},
 isApproved:{type:Boolean,default:function(){return this.role==="NGO";}},
 projects:[{type:mongoose.Schema.Types.ObjectId,ref:"Project"}],
 creditsIssued:{type:Number,default:0},
 profileImg:{type:String}
},{timestamps:true});

const User=mongoose.models.User||mongoose.model("User",userSchema);
export default User;