'use client';
import {useUser} from "@auth0/nextjs-auth0/client";
import { Card } from "@/app/components/card";
import Image from "next/image";

export default function UserSettingPage(){


  const {user, error, isLoading} = useUser();

  if(error) throw Error ("Failed loading user.");

  if(isLoading) {
    return <p>Loading...</p>
  }
  return(
    <Card>
      <div>
        <h1>Setting Page</h1>
        <div>
          {user?.picture? (
          <Image className="rounded-full" src={user?.picture } alt="profile picture" width="50" height="50" loading="eager" />
          ):(
            <></>
          )}
        </div>
        <h3>User Name: {user?.username}</h3>
        <h3>E-mail:{user?.email}</h3>
      </div>
    </Card>
  )
}