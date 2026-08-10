import {Children} from "react";


export interface CardInterface {
variant?: string;
className?: string;
children:React.ReactNode;
}


export const Card =({children,variant="primary"}:CardInterface) =>{
 let classes="rounded-md px-10 py-2 w-xl "
  switch(variant){
    case 'liked-card':
      classes = classes + "border m-1 h-35"  ;
      break;
      default: classes = classes + "h-48";
  }
  return(
    <div className={classes}>{children}</div>
  )
}