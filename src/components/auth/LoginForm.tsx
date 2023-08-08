"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react";

// components
import ErrorMessage from "./ErrorMessage";

// icons
import {PiEyeBold, PiEyeClosedBold} from "react-icons/pi"
import {FcGoogle} from "react-icons/fc"

const passwordReg = /^(?=.*[a-zA-Z])[A-Za-z\d!@#$%^&*()_+]/;

const loginSchema = yup.object({
    email: yup.string().required("Enter your email").email(),
    password: yup
    .string()
    .required("Enter your password")
    .matches(
      passwordReg,
      "Password must contain at least one alphabet"
    )
    .min(6, "Password must be at least 6 characters"),
})

type FormData = {
    email: string;
    password: string;
}

const LoginForm = () => {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver: yupResolver(loginSchema),
    })

    const onSubmit = (data: object) => console.log(data);

    const [passwordVisible, setPasswordVisible] = useState(false);

    // Google Login
    const handleGoogleLogin = () => {
      signIn("google", {callbackUrl: "http://localhost:3000"})
    }
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center md:px-[20%] gap-3">
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto flex flex-col gap-3">
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

        <button className="primary-button" type="submit">
          Sign In
        </button>
    </form>

    {/* Google SignIn */}
    <button className="flex justify-center items-center primary-button gap-2" onClick={handleGoogleLogin}>
      Sign In with Google <FcGoogle className="text-2xl"/>
    </button>
    </div>
  )
}

export default LoginForm