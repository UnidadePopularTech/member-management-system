
'use client'
import { useAuth } from "@/app/hooks/useAuth";
import { useState } from "react";

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth()
  
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email: "user@example.com",
        password: "password123",
        redirect: true,
        callbackUrl: "/dashboard"
      });
    } catch (error) {
      console.error("Login failed", error);
      setIsLoading(false);
    }
  };
  
  return (
    <button 
      onClick={handleLogin}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {isLoading ? "Logging in..." : "Login"}
    </button>
  );
}
