import Header from "@/components/auth/Header";
import LoginForm from "@/components/auth/LoginForm";

const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 border-2 border-primary rounded-xl py-5 px-5 w-1/3 h-auto">
        <Header title="Log in" />
        <LoginForm />
    </div>
  )
}

export default Register