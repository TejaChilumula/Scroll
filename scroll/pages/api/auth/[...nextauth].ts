import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
//import {Google} from 'next-auth/providers';
//import Providers from 'next-auth/providers';
import  Providers from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import prisma from "@/libs/prismadb"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  /*callbacks: {
    async signIn(params) {
      const { user, account, profile } = params;

      // Extract relevant information from profile
      const { email, name, image,  } = profile || {};

      // Save user profile in MongoDB
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (!existingUser) {
        //const hashedPassword = await bcrypt.hash(id, 10); // Hashing example
        const hashedPassword = 'dahiahdnoannffffffffffa';
        const createdUser = await prisma.user.create({
          data: {
            email,
            name,
            image,
            hashedPassword, // Storing a hashed password, modify as needed
            // Other profile data to save in MongoDB
          },
        });
        return true; // User signed in
      }

      return true; // User signed in
    },

    // Other callbacks...
  },*/
  providers: [

     GoogleProvider({
      clientId : process.env.GOOGLE_CLIENT_ID as string,
      clientSecret : process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      },

      
    })
  ],
  
    

  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

//const handler = NextAuth(authOptions);

//export {handler as GET, handler as POST};

export default NextAuth(authOptions);