"use client"

import { useState } from "react"
import {useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const searchSchema = yup.object({
    email: yup.string().required("Enter your friend's email to search").email("Email must be a valid email")
})

type FormData = {
    email: string
}

const FriendSearch = () => {
    const [showStatus, setShowStatus] = useState<string>("")

    const {
        register,
        handleSubmit,
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

        await fetch("/api/friends", options)
        .then(res =>  res.json())
        .then(data => setShowStatus(data.message))
    }

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 h-32 items-center">
            <div className="w-8/12 h-[52px]">
                <input 
                    type="text"
                    {...register("email")} 
                    placeholder="Add Friends by Email"
                    className="primary-input h-[52px]"
                />
                {/* {errors && <ErrorMessage error={errors.email?.message}/>} */}
                {showStatus && <p className={`pt-1 pl-5 text-sm ${showStatus === "Friend request sent" ? "text-green-500" : "text-red-500"} font-medium`}>{showStatus}</p>}
            </div>
            <button 
                className="rounded-xl bg-primary text-white text-center w-4/12 h-[52px]"
                type="submit"
            >
                Add Friend 
            </button>
        </form>
    </>
  )
}

export default FriendSearch