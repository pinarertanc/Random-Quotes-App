
interface QuoteInterface {
  label:string;
}

export const Quote = ({label}) => {

let classes = "font-semibold text-center";
 
return(
  <p className={classes} >{label}</p>
)

}