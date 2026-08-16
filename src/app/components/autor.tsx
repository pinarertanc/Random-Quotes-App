
export interface AutorProps {
label:string;
}

export const Autor = ({label}:AutorProps) => {

let classes = "italic";
 
return(
  <p className={classes} >{label}</p>
)

}