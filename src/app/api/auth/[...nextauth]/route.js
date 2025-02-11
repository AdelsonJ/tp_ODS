import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email ou Nome de Usuário', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { identifier, password } = credentials || {};

        if (!identifier || !password) {
          return null;
        }

        // Verificar se é e-mail ou nome de usuário
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

        console.log("SUPOSTO EMAIL OU USERNAME: ",isEmail);
        const usuario = await prisma.usuario.findUnique({
          where: isEmail
            ? { email: identifier }
            : { username: identifier },
        });

        if (!usuario) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, usuario.senha);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: usuario.id,
          username: usuario.username,
          nome: usuario.nome,
          email: usuario.email,
          data_nasc: usuario.data_nasc,
          tipo: usuario.tipo,
          idade: usuario.idade,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.nome = user.nome;
        token.email = user.email;
        token.data_nasc = user.data_nasc;
        token.tipo = user.tipo;
        token.idade = user.idade;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        username: token.username,
        nome: token.nome,
        email: token.email,
        data_nasc: token.data_nasc,
        tipo: token.tipo,
        idade: token.idade,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };