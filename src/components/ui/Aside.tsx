import { signOut } from "next-auth/react"

const Aside = ({name, username, email, className}: {name?: string, username?: string, email?: string, className?: string}) => {
  return (
    <div className={`${className} border-l border-b min-w-max min-h-min py-5 px-5 shadow-md z-30 transition-all duration-1000`}>
        <p className="text-xl font-semibold">{name || username}</p>
        <p className="mt-3">{email}</p>
        <button className="primary-button md:hidden mt-3" onClick={() => signOut({callbackUrl: "/login"})}>
                Sign Out
        </button>
    </div>
  )
}

export default Aside