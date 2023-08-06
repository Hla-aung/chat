import {PiWarningCircleBold} from "react-icons/pi"
import { IconContext } from "react-icons"

type Props = {
    error: React.ReactNode
}

const ErrorMessage = (props: Props) => {
  return (
    <IconContext.Provider value={{color: "#e51418"}}>
        {props.error && <div className="text-[10px] font-light text-warning flex items-center gap-1">
            <PiWarningCircleBold />
            <p>{props.error}</p>
        </div>}
    </IconContext.Provider>
  )
}

export default ErrorMessage