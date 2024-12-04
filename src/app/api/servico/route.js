import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Para a rota GET
export async function GET(req) {
  try {
    const servicos = await prisma.servico.findMany();
    return new Response(JSON.stringify(servicos), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar servicos' }), { status: 500 });
  }
}

// Se você também for permitir POST, deve definir aqui
export async function POST(req) {
  try {
    const { nome,  descricao, categoria } = await req.json();

    const novoServico = await prisma.servico.create({
      data: {
        nome,
        descricao,
        categoria,
      },
    });

    return new Response(JSON.stringify({ message: "Serviço criado com sucesso", servico: novoServico }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao criar serviço", message: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
      const { ids } = await req.json();

      if (!ids || !Array.isArray(ids)) {
          return new Response(JSON.stringify({ error: "IDs inválidos" }), { status: 400 });
      }

      await prisma.servico.deleteMany({
          where: {
              id: { in: ids },
          },
      });

      return new Response(JSON.stringify({ message: "Serviços excluídos com sucesso" }), { status: 200 });
  } catch (error) {
      return new Response(JSON.stringify({ error: "Erro ao excluir serviços", message: error.message }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    // Parse a requisição para extrair os dados do corpo
    const { id, nome, categoria, descricao } = await req.json();

    // Verifique se o ID foi fornecido
    if (!id) {
      return new Response(JSON.stringify({ error: "ID é obrigatório" }), { status: 400 });
    }

    // Atualize o registro no banco de dados
    const servicoAtualizado = await prisma.servico.update({
      where: { id },
      data: {
        nome,
        descricao,
        categoria,
      },
    });

    return new Response(
      JSON.stringify({ message: "Servico atualizado com sucesso", servico: servicoAtualizado }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar servico", message: error.message }),
      { status: 500 }
    );
  }
}

