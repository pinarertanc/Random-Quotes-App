
export interface AuthorProps {
label:string;
}

export const Author = ({label}:AuthorProps) => {

let classes = "italic text-center";
 
return(
  <p className={classes} >{label}</p>
)

}