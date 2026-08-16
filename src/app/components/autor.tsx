
export interface AutorProps {
label:string;
}

export const Autor = ({label}:AutorProps) => {

let classes = "italic text-center";
 
return(
  <p className={classes} >{label}</p>
)

}