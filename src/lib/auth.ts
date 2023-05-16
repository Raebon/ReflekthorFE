import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Authenticate user with credentials
          const res = await axios.post(`${process.env.API_URL}users/log-in`, {
            password: credentials?.password,
            email: credentials?.email,
          });

          if (res.data) {
            return res.data;
          }

          return null;
        } catch (error) {
          throw new Error();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user;
      }
      return Promise.resolve(token);
    },
    async session({ session, token }: any) {
      /*  document.cookie = `JwtToken=${token};`; */
      session.accessToken = token;
      session.error = token.error;
      return session;
    },
  },
};
export default NextAuth(authOptions);
