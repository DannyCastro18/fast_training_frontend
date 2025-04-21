import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "select_account",
          scope: "openid email profile"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log('Usuario autenticado con Google:', user);
      
      if (account.provider === "google") {
        // Guardar datos del usuario de Google en localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem("id", user.id);
          localStorage.setItem("email", user.email);
          localStorage.setItem("name", user.name);
          localStorage.setItem("image", user.image);
          localStorage.setItem("provider", "google");
        }
        
        // Redireccionar según tu lógica (puedes ajustar esto)
        return '/jugador/inicio'; // Cambia esta ruta según necesites
      }
      
      return true;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === 'development'
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };