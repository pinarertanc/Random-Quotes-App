'use client';

import { createContext } from "react";

interface UserContextInterface {
  email:string;
  username:string;
}

export const UserContext = createContext<UserContextInterface>({
  email: "",
  username: ""
});