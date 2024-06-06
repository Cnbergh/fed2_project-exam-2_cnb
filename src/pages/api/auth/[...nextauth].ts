import NextAuth from 'next-auth';
import { User as NextAuthUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import fetcher from '../../../lib/fetcher';
import { Login_URL } from '../../../api/constants';

interface ExtendedUser extends NextAuthUser {
  accessToken?: string; // Make accessToken optional
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await fetcher(Login_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          if (user) {
            return user.data; // Adjusted to return user.data
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error during login:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: ExtendedUser }) {
      if (user) {
        token.id = user.id;
        if (user.accessToken) {
          token.accessToken = user.accessToken;
        }
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        if (token.accessToken) {
          session.user.accessToken = token.accessToken;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
