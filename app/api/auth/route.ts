import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,  // From .env.local
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // From .env.local
    }),
  ],
  pages: {
    signIn: "/signup", // Custom sign-in page
  },
};

export default NextAuth(authOptions);
