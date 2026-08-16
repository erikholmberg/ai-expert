import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth } = NextAuth({
  trustHost: true,
  providers: [GitHub],
  callbacks: {
    jwt({ token, account }) {
      if (account?.provider && account.providerAccountId) {
        token.appUserId = `${account.provider}:${account.providerAccountId}`;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id =
          (typeof token.appUserId === "string" && token.appUserId) ||
          (typeof token.sub === "string" && token.sub) ||
          "";
      }
      return session;
    },
  },
});
