export const Button = ({label, onClick, variant='primary',disabled}) => {
let classes = "hover:cursor-pointer ";
    switch(variant){
      case 'icon':
        classes = classes + "p-4 rounded-full";
        break;
    default:
      classes = classes + "px-3 py-1 bg-mist-800 text-mist-300 rounded-md disabled:bg-gray-200 disabled:cursor-default"
    }

  return (
    <button onClick = {onClick} className={classes} disabled={disabled}>{label} </button>
  )
}