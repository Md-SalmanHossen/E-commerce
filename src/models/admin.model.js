import mongoose from "mongoose";
import bcrypt, { hash } from 'bcrypt';

const DataSchema=new mongoose.Schema({
   email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true
   },
   password:{type:String,required:true},
},{
   timestamps:true,
   versionKey:false
});

DataSchema.pre("save",async(next)=>{
   if(!this.isModified("password")){
      return next();
   }
   this.password= await hash(this.password,10);
   next();
})


const adminModel=mongoose.model('admins',DataSchema);
export default adminModel;