import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: { prompt: "select_account" }
      }
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log('Usuario autenticado:', user);
      return true;
    },
    async session({ session }) {
      return session;
    }
  },
  // Configuración adicional recomendada (sin afectar Google)
  pages: {
    signIn: '/auth/login', // Ruta personalizada para login
    error: '/auth/error' // Ruta para errores de autenticación
  },
  session: {
    strategy: 'jwt', // Usar JWT en lugar de base de datos
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  debug: process.env.NODE_ENV === 'development' // Solo debug en desarrollo
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };