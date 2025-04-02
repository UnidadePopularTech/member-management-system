import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";

// Adicione esta linha para forçar o uso do Node.js runtime
export const runtime = 'nodejs';

// Crie o handler do NextAuth
const handler = NextAuth(authOptions);

// Exporte as funções GET e POST
export { handler as GET, handler as POST };
