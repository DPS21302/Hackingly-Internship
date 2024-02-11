import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "someone@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { data: user } = await axios.post(`${apiUrl}/users/login/`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (user) {
            return user;
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/error", // Error page
  },
  callbacks: {
    async jwt({ token, user }) {
      // If the user object exists, it means this is the login flow
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      // Assign the user to the session
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
