import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const passwordReg = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]/;

const registerSchema = yup.object({
  username: yup.string().required("Please fill your username"),
  email: yup
    .string()
    .required("Please fill your email")
    .email(),
  password: yup
    .string()
    .required("Please fill your password")
    .matches(
      passwordReg,
      "Your password must contain at least one alphabet and at least one number"
    )
    .min(6, "Your password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match") 
})

const RegisterForm = () => {
  return (
    <div>
      <form action="">
        <input type="text"/>
      </form>
    </div>
  )
}

export default RegisterForm