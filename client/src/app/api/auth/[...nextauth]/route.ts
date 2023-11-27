import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({

            name: "credentials",

            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                const response = await fetch("http://localhost:3001/api/user/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials)
                });
                const user = await response.json();

                if (response.ok && user) {
                    return user.res;
                }

                return null;
            }

        })
    ],

    pages: {
        signIn: "/join"
    },

    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user);
            return token;
        },

        async session({ session, token }) {
            session = token.user as any;
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };