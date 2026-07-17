import { children } from "react";

export const Card =({children,variant="primary"}) =>{
 let classes="rounded-md px-10 py-2 w-xl "
  switch(variant){
    case 'liked-card':
      classes = classes + "border border-mist-400 m-1 h-35"  ;
      break;
      default: classes = classes + "bg-olive-400 h-48";
  }
  return(
    <div className={classes}>{children}</div>
  )
}