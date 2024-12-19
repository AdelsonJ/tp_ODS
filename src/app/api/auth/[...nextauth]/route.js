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
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        if (!email || !password) {
          return null; // Credenciais faltando
        }

        // Consultar o banco de dados para encontrar o usuário
        const usuario = await prisma.usuario.findUnique({
          where: {
            email: email,
          },
        });

        // Se o usuário não for encontrado, retorna null
        if (!usuario) {
          return null;
        }

        // Verificar a senha usando bcrypt
        const isPasswordValid = await bcrypt.compare(password, usuario.senha);

        // Se a senha for inválida, retorna null
        if (!isPasswordValid) {
            return null;
        }


        // Se o usuário for autenticado com sucesso, retorna os dados do usuário
        console.log('Usuário autenticado com sucesso:', usuario);
        return { 
            username: usuario.username, 
            nome: usuario.nome, 
            email: usuario.email,
            data_nasc: usuario.data_nasc, 
            senha: usuario.senha,
            tipo: usuario.tipo,
            idade: usuario.idade 
        };
      },
    }),
  ],
  callbacks: {
    // Adicionar informações personalizadas ao token JWT
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
  
    // Adicionar informações do token JWT à sessão
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

export { handler as GET, handler as POST }; // Suporte para GET e POST.
