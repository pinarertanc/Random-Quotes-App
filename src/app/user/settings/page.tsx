'use client';
import {useUser} from "@auth0/nextjs-auth0/client";
import { Card } from "@/app/components/card";
import Image from "next/image";

export default function UserSettingPage(){

  const {user, error, isLoading} = useUser();
  return(
    <Card>
      <div className="" >
        <h1>Setting Page</h1>
        <div>
          <Image src={user.picture} alt="profile picture"/>
        </div>
        <h3>User Name: {user.username}</h3>
        <h3>E-mail:{user.email}</h3>
      </div>
    </Card>
  )
}