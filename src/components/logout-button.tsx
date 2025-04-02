'use client'
import { useAuth }  from "@/app/hooks/useAuth"

export default function LogoutButton() {
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };
  
  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded"
    >
      Logout
    </button>
  );
}
