
export interface AutorInterface {
label:string;
}

export const Autor = ({label}:AutorInterface) => {

let classes = "italic text-center";
 
return(
  <p className={classes} >{label}</p>
)

}