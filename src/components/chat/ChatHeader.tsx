import { Friends } from "../friends/FriendAccepted"
import Image from "next/image"

type ChatPartner = Array<Friends>

const ChatHeader = ({chatPartner}: {chatPartner: ChatPartner}) => {
    const [friend] = chatPartner
    
  return (
    <div className="w-full shadow-sm px-3">
        <div className="flex items-center gap-5 border-b-2 py-3">
                  {friend?.image ? (
                    <Image
                      src={friend?.image}
                      alt=""
                      width={100}
                      height={100}
                      className="w-16 h-16 rounded-full"
                      priority
                    />
                  ) : (
                    <div className="text-primary text-2xl border border-primary w-16 h-16  font-semibold rounded-full uppercase flex justify-center items-center flex-shrink-0">
                      <p>{friend?.username.slice(0, 2)}</p>
                    </div>
                  )}
                    <div className="w-full">
                    <p className="text-xl font-semibold">{friend?.username}</p>
                        
                      </div>
                  </div>
    </div>
  )
}

export default ChatHeader