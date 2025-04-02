import {useAuth} from "@/app/hooks/useAuth"
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await useAuth();
  
  // Protect the route
  if (!session) {
    redirect("/api/auth/signin");
  }
  
  return (
    <div>
      <h1>Profile Page</h1>
      {/* <p>Welcome {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
      <p>Role: {session.user?.role}</p>
      <p>User ID: {session.user?.id}</p> */}
    </div>
  );
}