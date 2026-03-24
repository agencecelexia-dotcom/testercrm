import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { ROLE_DASHBOARD } from '@/lib/constants'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Veuillez renseigner votre e-mail et mot de passe')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          throw new Error('Aucun compte trouvé avec cet e-mail')
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error('Mot de passe incorrect')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },

    async redirect({ url, baseUrl }) {
      // If the url is relative, prepend the base URL
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }

      // If already on the same origin, allow
      if (url.startsWith(baseUrl)) {
        return url
      }

      // Default: redirect to base
      return baseUrl
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}

/**
 * Helper to get the dashboard path for a given role.
 */
export function getDashboardPath(role: string): string {
  return ROLE_DASHBOARD[role as keyof typeof ROLE_DASHBOARD] ?? '/dashboard'
}
