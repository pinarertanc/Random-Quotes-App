
interface QuoteInterface {
  label:string;
}

export const Quote = ({label}) => {

let classes = "font-semibold";
 
return(
  <p className={classes} >{label}</p>
)

}