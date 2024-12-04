const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Dados de um único local
  const local = {
    nome: 'Local A',
    categoria: 'Esporte',
    descricao: 'Local para eventos esportivos',
    capacidade: 500,
    endereco: 'Rua das Flores, 123',
  };

  // Inserindo o único local
  const createdLocal = await prisma.local.create({
    data: local,
  });

  console.log('Local criado:', createdLocal);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
