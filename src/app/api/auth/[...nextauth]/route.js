import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            authorization: {
                params: { prompt: "select_account" }, // Esto forzará la selección de cuenta (Solo la puse de prueba)
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
        },
        async redirect({ url, baseUrl }) {
            return '/entrenador/inicio'; // Redirige siempre a una página (Por el momento también está de prueba)
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };