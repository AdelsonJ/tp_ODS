const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Dados de um único servico
  const servico = {
    nome: 'Servico A',
    categoria: 'Esporte',
    descricao: 'Servico para eventos esportivos',
  };

  // Inserindo o único servico
  const createdServico = await prisma.servico.create({
    data: servico,
  });

  console.log('Servico criado:', createdServico);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
