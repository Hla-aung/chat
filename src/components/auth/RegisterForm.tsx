"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "./ErrorMessage";
import {PiEyeBold, PiEyeClosedBold} from "react-icons/pi"

const passwordReg = /^(?=.*[a-zA-Z])[A-Za-z\d!@#$%^&*()_+]/;

const registerSchema = yup.object({
  username: yup.string().required("Please fill your username"),
  email: yup.string().required("Please fill your email").email(),
  password: yup
    .string()
    .required("Please fill your password")
    .matches(
      passwordReg,
      "Password must contain at least one alphabet"
    )
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: object) => console.log(data);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
  return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto px-[20%] flex flex-col gap-3">
        {/* username */}
        <div>
          <input 
            type="text" 
            placeholder="Username" 
            className={`primary-input`}
            {...register("username")}
            />
            <ErrorMessage error={errors.username?.message}/>
        </div>

        {/* email */}
        <div>
          <input 
            type="text" 
            placeholder="Email" 
            className={`primary-input`}
            {...register("email")}
            />
            <ErrorMessage error={errors.email?.message}/>
        </div>

        {/* password */}
        <div className="relative">
          <input 
            type={passwordVisible ? "text" : "password"} 
            placeholder="Password" 
            className={`primary-input`}
            {...register("password")}
          />
          <PiEyeClosedBold className={`absolute top-4 right-3 ${!passwordVisible && "hidden"} hover:cursor-pointer`} onClick={() => setPasswordVisible(false)}/>
          <PiEyeBold className={`absolute top-4 right-3 ${passwordVisible && "hidden"} hover:cursor-pointer`} onClick={() => setPasswordVisible(true)}/>
          <ErrorMessage error={errors.password?.message}/>
        </div>

        {/* confirm password */}
        <div className="relative">
          <input 
            type={confirmPasswordVisible ? "text" : "password"} 
            placeholder="Confirm Password" 
            className={`primary-input`}
            {...register("confirmPassword")}
          />
          <PiEyeClosedBold className={`absolute top-4 right-3 ${!confirmPasswordVisible && "hidden"} hover:cursor-pointer`} onClick={() => setConfirmPasswordVisible(false)}/>
          <PiEyeBold className={`absolute top-4 right-3 ${confirmPasswordVisible && "hidden"} hover:cursor-pointer`} onClick={() => setConfirmPasswordVisible(true)}/>
          <ErrorMessage error={errors.confirmPassword?.message}/>
        </div>
        <button className="primary-button" type="submit">
          Register
        </button>
      </form>
  );
};

export default RegisterForm;
