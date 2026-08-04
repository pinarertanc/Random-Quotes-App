export const Button = ({label, onClick, variant='primary',disabled}) => {
let classes = "hover:cursor-pointer ";
    switch(variant){
      case 'icon':
        classes = classes + "pl-120 p-2 rounded-full";
        break;
    default:
      classes = classes + "px-3 py-1 bg-mist-800 text-mist-300 rounded-md disabled:bg-olive-500 disabled:cursor-default"
    }

  return (
    <button onClick = {onClick} className={classes} disabled={disabled} suppressHydrationWarning={true}>{label}</button>
  )
}