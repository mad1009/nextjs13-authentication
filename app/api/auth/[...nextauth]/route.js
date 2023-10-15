import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import { authenticate, prisma } from "@/services/auth/authenticate"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      }),    

      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" }
        },
        async authorize (credentials, req) {
          if (typeof credentials !== "undefined") {
            const res = await authenticate(credentials.email, credentials.password)
            if (typeof res !== "undefined") {
              return { ...res.user, apiToken: res.token }
            } else {
              return null
            }
          } else {
            return null
          }
        }
      })
    ],
    session: { strategy: "jwt" },
    pages: {
      signIn: "/users/signin",
    },
  

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }



