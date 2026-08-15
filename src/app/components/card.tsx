import {Children} from "react";


export interface CardInterface {
variant?: string;
className?: string;
children:React.ReactNode;
}


export const Card =({children,variant="primary"}:CardInterface) =>{
 let classes="rounded-md px-7 py-2 w-full max-w-xl ring-2 ring-(--chart-2)/50 flex flex-col items-center justify-center "
  switch(variant){
    case 'liked-card':
      classes = classes + "border m-1 h-36  "  ;
      break;
      default: classes = classes + "min-h-48";
  }
  return(
    <div className={classes}>{children}</div>
  )
}