import { Children } from "react"

export const Card =({children}) =>{

  let classes="bg-mist-400 border-mist-900 rounded-md px-10 py-2 w-md h-64"

  return(
    <div className={classes}>{children}</div>
  )
}