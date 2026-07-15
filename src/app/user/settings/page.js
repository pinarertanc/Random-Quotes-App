'use client';
import { useContext } from "react";
import { UserContext } from "@/app/context/UserContext";
import { Card } from "@/app/components/card";

export default function UserSettingPage(){

  const {email,username} = useContext(UserContext);
  return(
    <Card>
      <div className="" >
        <h1>Setting Page</h1>
        <h2>User Informations</h2>
        <h3>User Name: {username}</h3>
        <h3>E-mail:{email}</h3>
      </div>
    </Card>
  )
}