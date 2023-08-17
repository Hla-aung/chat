"use client"

import { useState } from "react"
import {useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import ErrorMessage from "../auth/ErrorMessage"
import axios, {AxiosError} from "axios"

const searchSchema = yup.object({
    email: yup.string().required("Enter your friend's email to search").email("Email must be a valid email")
})

type FormData = {
    email: string
}

const FriendSearch = () => {
    const [showSuccess, setShowSuccess] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError
    } = useForm<FormData>({
        resolver: yupResolver(searchSchema)
    })

    const onSubmit = async (data: FormData) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        await fetch("http://localhost:3000/api/friend", options)
        .then(res => console.log(res))
    }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 h-32 items-center">
            <div className="w-8/12 h-[52px]">
                <input 
                    type="text"
                    {...register("email")} 
                    placeholder="Search Friends by Email"
                    className="primary-input h-[52px]"
                />
                {errors && <ErrorMessage error={errors.email?.message}/>}
                {showSuccess && <p className="text-[10px] text-xs text-green-500 font-light">Friend request has been sent!</p>}
            </div>
            <button 
                className="rounded-xl bg-primary text-white text-center w-4/12 h-[52px]"
                type="submit"
            >
                Search 
            </button>
        </form>
    </>
  )
}

export default FriendSearch