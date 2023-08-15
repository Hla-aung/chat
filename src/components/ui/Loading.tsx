import Logo from "@/icons/Logo"

const Loading = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <Logo className="w-24 h-24 md:w-32 md:h-32 animate-pulse"/>
    </div>
  )
}

export default Loading