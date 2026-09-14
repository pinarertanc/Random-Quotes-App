import HomeClient from '@/app/HomeClient';
import { getQuotes } from './(require-user)/quotes/action';
import { auth0 } from '@/lib/auth0';

export default async function Home() {


  const [quotes, session] = await Promise.all([getQuotes(), auth0.getSession() ])
  
  return (
    <HomeClient initialQuotes={quotes} userId={session?.user?.sub ?? null}/>
  );
}