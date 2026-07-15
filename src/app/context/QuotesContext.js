'use client';

import { createContext,useState } from "react";
import { userId } from "@/lib/auth";
import { myQuotes as initialQuotes } from "@/app/myQuotes";

export const QuotesContext = createContext(undefined);

export function QuotesContextProvider({children}){

  const [index, setIndex] = useState(0);
  
  const [myQuotes, setMyQuotes] = useState(initialQuotes.map(myQuotes => ({...myQuotes, likedBy:[]})));

  function handleNextClick(){
    if(index < myQuotes.length -1){
    setIndex(index +1);
  }
  }

  function handlePrevClick(){
    if(index > 0) {

    setIndex(index -1);
  }
  }

  function handleLike(){

    setMyQuotes ((prevQuotes)=>{
      return prevQuotes.map((quote, elementIndex)=>{
        if(elementIndex === index){
          const currentLikedBy = quote.likedBy || [];
          const alreadyLiked = currentLikedBy.includes(userId);
          return{
            ...quote, 
            likedBy: alreadyLiked ? currentLikedBy.filter((id)=> id !==userId):[...currentLikedBy, userId]
          };
        }
        return quote;
      });
      });
  }

return(
    
  <QuotesContext
  value={{myQuotes, index, handleLike, handleNextClick, handlePrevClick}}>{children}
  </QuotesContext>


);

};