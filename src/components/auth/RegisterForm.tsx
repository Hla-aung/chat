"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "../ui/LoadingSpinner";
import {PiEyeBold, PiEyeClosedBold} from "react-icons/pi"
import { useRouter } from "next/navigation"
import Swal from 'sweetalert2'
import { RegisterFormData } from "@/types/types";

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

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const router = useRouter()
  
    const onSubmit = async (data: RegisterFormData) => {
      setLoading(true)
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
  
      await fetch("/api/auth/register",options)
      .then(res => {
        if(res.status === 500){
          Swal.fire({
            title: res.statusText,
            text: 'Please sign in',
            icon: 'error',
            confirmButtonText: 'OK'
          })
          setLoading(false)
          return
        }
          Swal.fire({
            title: 'Registered successfully',
            icon: 'success'
          })
          setLoading(false)
          return res.json()
        })
      .then(data => data && router.push("/login"))
    };

  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto md:px-[20%] flex flex-col gap-3">
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
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : "Register"}
        </button>
      </form>
  );
};

export default RegisterForm;
