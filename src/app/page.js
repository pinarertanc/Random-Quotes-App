'use client';
import {myQuotes as initialQuotes} from '@/app/myQuotes.js';
import {useState} from 'react';
import {Button} from '@/app/components/button.js';
import {Autor} from '@/app/components/autor';
import {Quote} from '@/app/components/quote';
import {Card} from '@/app/components/card';

const userId ='user-1';

export default function Home() {
  const [index, setIndex] = useState(0);

  const [myQuotes, setMyQuotes] = useState(initialQuotes.map(myQuotes => ({...myQuotes, likedBy:[]})))

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

  const isLikedQuote = ()=>{
    const currentQuote = myQuotes?.[index];
    return(currentQuote?.likedBy || []).includes(userId);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-90 px-36 bg-white dark:bg-black sm:items-start">
        <Card>
        <div className="py-3">
          <Button onClick = {handleLike} label= {isLikedQuote () ? "💔" : "❤️"} variant="icon" />
          <Quote label={`${myQuotes[index].quote}`}/>
          <Autor label={`- ${myQuotes[index].autor}`}/>
        </div>
        <div className="flex gap-3">
        <Button onClick={handlePrevClick} label={"Previous Quote"} disabled={index===0} />
        <Button onClick = {handleNextClick} label={'Next Quote'} disabled={index===myQuotes.length-1}/>
       </div>      
       </Card>
        
      </main>
    </div>
  );
}
