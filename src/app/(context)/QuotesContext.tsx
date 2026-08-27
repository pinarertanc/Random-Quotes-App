'use client';

import { createContext, useState, useEffect } from "react";
import { myQuotes as initialQuotes, myQuotes } from "@/app/myQuotes";
import {useUser} from "@auth0/nextjs-auth0/client";
import { myQuotesProps } from "types/quotes";

interface QuotesContexProps {
  myQuotes: myQuotesProps[],
  index: number,
  handleLike: (targetQuote: myQuotesProps) => void;
  handleNextClick: () => void;
  handlePrevClick: () => void;
  addQuote: (newQuote: Partial<myQuotesProps>) => void;
}

export const QuotesContext = createContext({
  myQuotes: [],
  index: 0,
  handleLike: (targetQuote: myQuotesProps) => {},
  handleNextClick: () => {},
  handlePrevClick: () => {}
});

export function QuotesContextProvider<QuotesContextProps>({ children }: { children: React.ReactNode }) {
  const {user} = useUser();
  const [index, setIndex] = useState<number>(0);

  const [myQuotes, setMyQuotes] = useState<myQuotesProps[]>(() =>
    initialQuotes.map((q) => ({
      ...q,
      likedBy: q.likedBy || []
    }))
  );

  useEffect(() => {
    const savedQuotes = localStorage.getItem("myQuotes");
    if (savedQuotes) {
      try {
        setMyQuotes(JSON.parse(savedQuotes));
      } catch (error) {
        console.error("Failed to parse saved quotes:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (myQuotes.length > 0) {
      localStorage.setItem("myQuotes", JSON.stringify(myQuotes));
    }
  }, [myQuotes]);

  const handleNextClick = () => {
    if (index < myQuotes.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleLike = (targetQuote: myQuotesProps) => {
    if(!user) {
      alert("Please log in to like the quotes!");
      window.location.href= "/auth/login";
      return;
    }

    const userId = user.sub;
    setMyQuotes((prevQuotes) =>
      prevQuotes.map((item) => {
        if (item.quote!== targetQuote.quote) return item;

        const currentLikedBy = item.likedBy || [];
        const alreadyLiked = currentLikedBy.includes(userId);

        const updatedLikedBy = alreadyLiked
          ? currentLikedBy.filter((id) => id !== userId)
          : [...currentLikedBy, userId];

        return {
          ...item,
          author: item.author ,
          likedBy: updatedLikedBy
        };
      })
    );
  };

  const addQuote = (newQuote:myQuotesProps)=>{
    const quoteWithId ={
      id: Date.now().toString(),
      quote: newQuote.quote,
      author: newQuote.author,
      likedBy: []
    };
    setMyQuotes((prevQuotes)=>[quoteWithId, ...prevQuotes]);
  }

  return (
    <QuotesContext
      value={{ myQuotes, index, handleLike, handleNextClick, handlePrevClick, addQuote }}
    >
      {children}
    </QuotesContext>
  );
}