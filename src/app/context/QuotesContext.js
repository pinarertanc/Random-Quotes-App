'use client';

import { createContext,useState, useEffect } from "react";
import { userId } from "@/lib/auth";
import { myQuotes as initialQuotes } from "@/app/myQuotes";

export const QuotesContext = createContext(undefined);

export function QuotesContextProvider({children}){

  const [index, setIndex] = useState(0);

  const [myQuotes, setMyQuotes] = useState(()=>{
    if (typeof window !== "undefined"){
      const savedQuotes = localStorage.getItem("myQuotes");
      if(savedQuotes){
        try {
          return JSON.parse(savedQuotes);
        } catch (error){
          console.error("Failed to parse saved quotes:", error);
        } 
      }
    }
    return initialQuotes.map(myQuotes => ({...myQuotes, likedBy:[]}));
  });

  useEffect(()=>{
    if(typeof window !== "undefined"){
      localStorage.setItem("myQuotes", JSON.stringify(myQuotes));
    }
  }, [myQuotes]

  );

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

  function handleLike(specificQuote = null){

    console.log("Context içindeki handleLike tetiklendi! Parametre:", specificQuote);

    setMyQuotes ((prevQuotes)=>{
      return prevQuotes.map((quote, elementIndex)=>{

        const isTarget = specificQuote ? quote.quote === specificQuote.quote : elementIndex === index;

        if(isTarget){
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