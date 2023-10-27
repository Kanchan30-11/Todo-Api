import randomstring from "randomstring";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode,emailUser,emailPassword } from "../utils/constants.js";
import User from "../models/User.js";


const resetPasswordmail =async(res,name,email,token)=>{

    try {
        const transporter =await nodemailer.createTransport({
          host:'smtp.gmail.com',
          port:587,
          secure:false,
          requireTLS:true,
          auth:{
              user:constants.emailUser,
              pass:constants.emailPassword
          }
        })

        const mailOptions ={
          from:constants.emailuser,
          to:email,
          subject:'For Reset Password',
          html:`<p>Hii ${name} Please copy the link <a href="http://localhost:8000/api/reset-password?token">and reset your password</a> </p>`
        }
        transporter.sendMail(mailOptions,function(res,error,info){
              if(error){
               res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error"))
              }else{
               res.json(jsonGenerate(StatusCode.SUCCESS,"Mail has been sent ",info.response))
             }
           })

    } catch (error) {
      return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Email does not exist ",error))
    }
  }


const forgetVerify=async(req,res)=>{

   try {
       const email = req.body.email;
        const userData = await User.findOne({email:email});
         
        if(userData){
            const randomString = randomstring.generate();
           const data = await User.updateOne({email:email},{$set:{token:randomString}})
           resetPasswordmail(userData.name,userData.email,randomString);
            res.json(jsonGenerate(StatusCode.SUCCESS,"Check your mailbox and reset your password"))
        }

   } catch (error) {
     return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Email does not exist ",error.mapped()))
   }
}

export default forgetVerify;