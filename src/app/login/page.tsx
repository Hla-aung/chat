import Header from "@/components/auth/Header";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/icons/Logo";
import Link from "next/link";

const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-5 md:border-2 md:border-primary rounded-xl py-5 px-5 w-full md:w-1/3 h-auto">
        <Logo className="w-32 h-32"/>
        <Header title="Sign in" />
        <LoginForm />
        <div>Don&apos;t have an account yet? <Link href={"/register"} className="text-primary">Create an account</Link></div>
    </div>
  )
}

export default Register