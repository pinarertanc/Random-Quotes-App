'use client';

import { createContext, useState, useEffect } from "react";

import { myQuotes as initialQuotes, myQuotes } from "@/app/myQuotes";

interface QuotesContextIntercafe {
  myQuotes: myQuotes[],
  index: number,
  handleLike: (targetQuote: myQuotes) => void;
  handleNextClick: () => void;
  handlePrevClick: () => void;
  
}

export const QuotesContext = createContext({
  myQuotes: [],
  index: 0,
  handleLike: (targetQuote: myQuotes) => {},
  handleNextClick: () => {},
  handlePrevClick: () => {}
});

export function QuotesContextProvider<QuotesContextIntercafe>({ children }) {
  const [index, setIndex] = useState<number>(0);

  const [myQuotes, setMyQuotes] = useState<myQuotes[]>(() =>
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

  const handleLike = (targetQuote: myQuotes) => {
    setMyQuotes((prevQuotes) =>
      prevQuotes.map((item) => {
        if (item.quote!== targetQuote.quote) return item;

        const currentLikedBy = item.likedBy || [];
        const alreadyLiked = currentLikedBy.includes('UserId');

        const updatedLikedBy = alreadyLiked
          ? currentLikedBy.filter((id) => id !== 'UserId')
          : [...currentLikedBy, 'UserId'];

        return {
          ...item,
          likedBy: updatedLikedBy
        };
      })
    );
  };

  return (
    <QuotesContext
      value={{ myQuotes, index, handleLike, handleNextClick, handlePrevClick }}
    >
      {children}
    </QuotesContext>
  );
}