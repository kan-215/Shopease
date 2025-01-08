import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to MongoDB if not already connected
        if (mongoose.connections[0].readyState === 0) {
          await mongoose.connect(process.env.MONGODB_URI);
        }

        // Find user by email
        const user = await User.findOne({ email: credentials?.email });
        if (user && bcrypt.compareSync(credentials?.password, user.password)) {
          return { id: user._id, name: user.name, email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt", // Use JWT for session handling
  },
  callbacks: {
    // Handle JWT tokens and add user data to the token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    // Handle session and add user data to the session
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  // Custom NextAuth API handler
  debug: true, // Enable debug mode to get more insights
});

export { handler as GET, handler as POST };
