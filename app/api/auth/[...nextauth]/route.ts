import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day in seconds
  },
  callbacks: {
    async session({ session, token }) {
      // Add user ID to session
    //   if (token.sub && session.user) {
    //     session.user.id = token.sub;
    //   }
      return session;
    },
  },
//   pages: {
//     signIn: '/',
//   },
});

export { handler as GET, handler as POST };