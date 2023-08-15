import Header from "@/components/auth/Header";
import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/icons/Logo";
import Link from "next/link"

const Register = () => {
  return (
    <div className="flex flex-col md:justify-center items-center gap-y-5 md:border-2 md:border-primary rounded-xl py-5 px-5 w-full md:w-1/3 h-auto">
        <Logo className="w-24 h-24 md:w-32 md:h-32"/>
        <Header title="Register" />
        <RegisterForm />
        <div>Already had an account? <Link href={"/login"} className="text-primary">Sign In</Link></div>
    </div>
  )
}

export default Register