import Image from "next/image";
import LoadingSpinner from "../ui/LoadingSpinner";


type Friends = {
    email: string;
    username: string;
    image: string;
  };
type FriendType = Array<Array<Friends>>;

const FriendAccepted = ({isLoading, friends}: {isLoading: boolean, friends: FriendType}) => {
  return (
    <div className="w-full max-h-[30vh]">
      <div className="flex items-center gap-3">
        <p className="text-2xl font-semibold">Friends</p>
        <p className="w-6 h-6 rounded-full bg-primary text-center text-white">
          {friends.length || 0}
        </p>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {friends.length > 0 ? (
            <div className="flex flex-col mt-2 px-3 pt-2  overflow-y-scroll w-full h-full">
              {friends.map((sender, i) => (
                <div key={i} className="flex items-center gap-5 border-b-2 py-3" >
                  {sender[0]?.image ? (
                    <Image
                      src={sender[0]?.image}
                      alt=""
                      width={100}
                      height={100}
                      className="w-20 h-20 rounded-full"
                    />
                  ) : (
                    <div className="text-primary text-2xl border border-primary w-20 h-20  font-semibold rounded-full uppercase flex justify-center items-center flex-shrink-0">
                      <p>{sender[0]?.username.slice(0, 2)}</p>
                    </div>
                  )}
                    <div className="w-full">
                    <p className="text-xl font-semibold">{sender[0]?.username}</p>
                        
                      </div>
                  </div>
              ))}
            </div>
          ) : (
            <p>No friend</p>
          )}
        </>
      )}
    </div>
  )
}

export default FriendAccepted