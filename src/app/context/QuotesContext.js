'use client';

import { createContext, useState, useEffect } from "react";
import { userId } from "@/lib/auth";
import { myQuotes as initialQuotes } from "@/app/myQuotes";

export const QuotesContext = createContext({
  myQuotes: [],
  index: 0,
  handleLike: () => {},
  handleNextClick: () => {},
  handlePrevClick: () => {}
});

export function QuotesContextProvider({ children }) {
  const [index, setIndex] = useState(0);

  const [myQuotes, setMyQuotes] = useState(() =>
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

  const handleLike = () => {
    setMyQuotes((prevQuotes) =>
      prevQuotes.map((quote, i) => {
        if (i !== index) return quote;

        const currentLikedBy = quote.likedBy || [];
        const alreadyLiked = currentLikedBy.includes(userId);

        const updatedLikedBy = alreadyLiked
          ? currentLikedBy.filter((id) => id !== userId)
          : [...currentLikedBy, userId];

        return {
          ...quote,
          likedBy: updatedLikedBy
        };
      })
    );
  };

  return (
    <QuotesContext.Provider
      value={{ myQuotes, index, handleLike, handleNextClick, handlePrevClick }}
    >
      {children}
    </QuotesContext.Provider>
  );
}