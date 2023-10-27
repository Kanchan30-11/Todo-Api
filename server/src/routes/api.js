import express  from "express";
import Register from "../contoller/Register.controller.js";
import  createTodo  from "../contoller/Todo.controller.js";
import Login from "../contoller/Login.controller.js";
import forgetPassword from "../contoller/Forgetpassword.js";
import { RegisterSchema } from "../ValidationSchema/RegisterSchema.js";
import { LoginSchema } from "../ValidationSchema/LoginSchema.js";
import { check } from "express-validator";
import resetPassword from "../contoller/ResetPassword.js";

const apiRoute= express.Router();

  

apiRoute.post('/register',RegisterSchema,Register)
apiRoute.post('/login',LoginSchema,Login)
apiRoute.post('/createTodo',[check("desc","Todo desc is required").exists()],createTodo)
apiRoute.post('/forgetPassword',forgetPassword)
apiRoute.post('/reset-password/?token',resetPassword)
// 


export default apiRoute;
