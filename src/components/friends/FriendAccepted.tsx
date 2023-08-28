import Image from "next/image";
import LoadingSpinner from "../ui/LoadingSpinner";
import Link from "next/link";
import { sortUserIds } from "@/utils/utilities";
import { useEffect, useState } from "react";
import { pusherClient } from "@/utils/pusher";
import { InitialChat } from "../chat/ChatBody";
import { usePathname } from "next/navigation";

export type Friends = {
  _id: string;
  email: string;
  username: string;
  image: string;
};
type FriendType = Array<Array<Friends>>;

type User = {
  _id: string;
};

const FriendAccepted = ({
  isLoading,
  friends,
  user,
}: {
  isLoading: boolean;
  friends: FriendType;
  user: User;
}) => {
  const pathname = usePathname();

  const [unseenMessages, setUnseenMessages] = useState<InitialChat[]>([]);

  console.log(unseenMessages)

  useEffect(() => {
    user?._id && pusherClient.subscribe(user?._id);

    const unseenHandler = (message: InitialChat) => {
      const showMessageCount =
        pathname !== `/${sortUserIds(user?._id, message.senderId)}`;

      if (!showMessageCount) return;

      setUnseenMessages((prev) => [...prev, message]);
    };

    pusherClient.bind("newMessage", unseenHandler);

    return () => {
      pusherClient.unsubscribe(user?._id);
      pusherClient.unbind("newMessage", unseenHandler);
    };
  }, [pathname, user?._id]);

  useEffect(() => {
    if(pathname.includes('chat')){
      setUnseenMessages((prev) => {
        return prev.filter(message => !pathname.includes(message.senderId))
      })
    }
  }, [pathname])


  return (
    <div className="w-full max-h-[30vh] h-[30vh]">
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
            <div className="flex flex-col mt-2 px-3 pt-2  overflow-y-auto w-full h-full primary-scrollbar">
              {friends.map((friend, i) => {
                const unseenMessageCount = unseenMessages?.filter(
                  (unseen) => unseen.senderId === friend[0]?._id
                ).length;

                return (
                  <Link
                    href={`/chat/${sortUserIds(user?._id, friend[0]?._id)}`}
                    key={i}
                  >
                    <div
                      key={i}
                      className="flex items-center gap-5 border-b-2 py-3"
                    >
                      {friend[0]?.image ? (
                        <Image
                          src={friend[0]?.image}
                          alt=""
                          width={100}
                          height={100}
                          className="w-16 h-16 rounded-full"
                          priority
                        />
                      ) : (
                        <div className="text-primary text-2xl border border-primary w-16 h-16  font-semibold rounded-full uppercase flex justify-center items-center flex-shrink-0">
                          <p>{friend[0]?.username.slice(0, 2)}</p>
                        </div>
                      )}
                      <div className="w-full flex justify-between">
                        <p className="text-xl font-semibold">
                          {friend[0]?.username}
                        </p>
                        {unseenMessageCount > 0 && <p>{unseenMessageCount}</p>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p>No friend</p>
          )}
        </>
      )}
    </div>
  );
};

export default FriendAccepted;
