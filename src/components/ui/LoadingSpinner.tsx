import {FiLoader} from "react-icons/fi"
import { IconContext } from "react-icons"

const LoadingSpinner = () => {
  return (
    <IconContext.Provider value={{className: "animate-spin", color: "#fff"}}>
        <FiLoader />
    </IconContext.Provider>
  )
}

export default LoadingSpinner