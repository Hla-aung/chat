import Header from "@/components/auth/Header";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 border-2 border-primary rounded-xl py-5 px-5 w-1/3 h-auto">
        <Header title="Register" />
        <RegisterForm />
    </div>
  )
}

export default Register