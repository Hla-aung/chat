import Image from "next/image";
import LoadingSpinner from "../ui/LoadingSpinner";
import Link from "next/link";
import { sortUserIds } from "@/utils/utilities";

type Friends = {
    _id: string;
    email: string;
    username: string;
    image: string;
  };
type FriendType = Array<Array<Friends>>;

type User = {
  _id: string
}

const FriendAccepted = ({isLoading, friends, user}: {isLoading: boolean, friends: FriendType, user: User}) => {
  
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
              {friends.map((friend, i) => (
                <Link href={`/${sortUserIds(user?._id, friend[0]?._id)}`} key={i}>
                <div key={i} className="flex items-center gap-5 border-b-2 py-3">
                  {friend[0]?.image ? (
                    <Image
                      src={friend[0]?.image}
                      alt=""
                      width={100}
                      height={100}
                      className="w-20 h-20 rounded-full"
                      priority
                    />
                  ) : (
                    <div className="text-primary text-2xl border border-primary w-20 h-20  font-semibold rounded-full uppercase flex justify-center items-center flex-shrink-0">
                      <p>{friend[0]?.username.slice(0, 2)}</p>
                    </div>
                  )}
                    <div className="w-full">
                    <p className="text-xl font-semibold">{friend[0]?.username}</p>
                        
                      </div>
                  </div>
                  </Link>
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