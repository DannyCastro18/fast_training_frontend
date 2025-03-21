import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            console.log('Usuario autenticado:', user);
            return true;
        },
        async session({ session }) {
            return session;
        },
        async redirect({ url, baseUrl }) {
            return '/dashboard'; // Redirige siempre al Dashboard después del login
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };