
import { useUser } from "@auth0/nextjs-auth0/client";
import { Card } from "@/app/components/card";
import Image from "next/image";

export default async function UserSettingPage() {
 
const session = await auth0.getSession();
const user = session?.user;

  return (
    
    <main className="flex flex-1 items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <Card >
        
        <div className="flex flex-col items-center justify-center text-center gap-4 py-6 w-full">
          <h1 className="text-2xl font-bold">Setting Page</h1>
          
          {user?.picture && (
            <div className="relative my-2">
              <Image 
                className="rounded-full border-2 border-(--chart-2)/50 object-cover" 
                src={user.picture} 
                alt="profile picture" 
                width={80} 
                height={80} 
                priority
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              User Name: <span className="font-normal">{user?.name || user?.nickname || "—"}</span>
            </h3>
            <h3 className="text-sm text-muted-foreground">
              E-mail: <span className="font-normal">{user?.email || "—"}</span>
            </h3>
          </div>
        </div>
      </Card>
    </main>
  );
}