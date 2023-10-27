import bcrypt from "bcrypt";
import User from "../models/User.js";




const resetPassword =async(req,res)=>{
 try {
    const token = req.query.token;
    const tokenData=await User.findOne({token:token})
    if(tokenData){
        const password = req.body.password;
        const salt= await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(password,salt);
        const newPassword = await hashPassword;

        const newData= await User.findByIdAndUpdate({_id:tokenData._id},{$set:{password:newPassword,token:''}},{new:true})
        res.status(200).send({success:true,msg:"User Password has been Updated",data:newData})
    }else{
      res.status(200).send({success:true,msg:"This link has been expired"})
    }
 } catch (error) {
    res.status(400).send({success:false,msg:error.message})
   }
    
  
}

export default resetPassword;