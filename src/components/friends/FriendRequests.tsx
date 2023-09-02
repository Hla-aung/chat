"use client"

import Image from "next/image";
import LoadingSpinner from "../ui/LoadingSpinner";
import { Dispatch, SetStateAction, useState } from "react";

type Sender = {
  _id: string;
  email: string;
  username: string;
  image: string;
};
type requestSender = Array<Array<Sender>>;

const FriendRequests = ({
  isLoading,
  requestSender,
  setRequestSender,
  user
}: {
  isLoading?: boolean;
  requestSender: requestSender;
  setRequestSender: Dispatch<SetStateAction<any[]>>;
  user: Sender;
}) => {
  const acceptFriend = async(email: string) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(email)
        }

        await fetch("/api/friends/accept", options)

        setRequestSender(prev => prev.filter((request) => request[0].email !== email))
        window.location.reload()
    }

    const denyFriend = async(email: string) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(email)
        }

        await fetch("/api/friends/deny", options)

        setRequestSender(prev => prev.filter((request) => request[0].email !== email))
        window.location.reload()
    }

  return (
    <div className="w-full max-h-[30vh] mb-3">
      <div className="flex items-center gap-3">
        <p className="text-2xl font-semibold">Friend Requests</p>
        <p className="w-6 h-6 rounded-full bg-primary text-center text-white">
          {requestSender.filter(sender => sender[0]?._id !== user?._id).length || 0}
        </p>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {requestSender.length > 0 ? (
            <div className="flex flex-col mt-2 px-3 pt-2  overflow-y-auto w-full h-full primary-scrollbar">
              {requestSender.map((sender, i) => (
                <>
                {sender[0]?._id !== user?._id && (<div key={i} className="flex items-center gap-5 border-b-2 py-3" >
                  {sender[0]?.image ? (
                    <Image
                      src={sender[0]?.image}
                      alt=""
                      width={100}
                      height={100}
                      className="w-20 h-20 rounded-full"
                      priority
                    />
                  ) : (
                    <div className="text-primary text-2xl border border-primary w-20 h-20  font-semibold rounded-full uppercase flex justify-center items-center flex-shrink-0">
                      <p>{sender[0]?.username.slice(0, 2)}</p>
                    </div>
                  )}
                    <div className="w-full">
                    <p className="text-xl font-semibold">{sender[0]?.username}</p>
                    <div className="flex gap-3 mt-2 w-full">
                        <button className="primary-button" onClick={() => acceptFriend(sender[0]?.email)}>Accept</button>
                        <button className="secondary-button" onClick={() => denyFriend(sender[0]?.email)}>Cancel</button>
                    </div>
                        
                      </div>
                  </div>)}
                  </>
              ))}
            </div>
          ) : (
            <p>No friend request</p>
          )}
        </>
      )}
    </div>
  );
};

export default FriendRequests;
