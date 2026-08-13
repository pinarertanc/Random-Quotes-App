export interface userInterface{
  id:string;
  username:string;
  picture?:string;
  email:string;


}

export const users: userInterface[] = [
  {
    id : 'User-1',
    username:'Pınar Ertanç',
    picture: "assets/pinarkurumsal.webp",
    email: 'pinarertanc@gmail.com'
  }
]

