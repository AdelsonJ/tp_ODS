// testPrisma.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const users = await prisma.usuario.findMany(); // Teste simples para verificar se conecta ao DB
    console.log(users);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
