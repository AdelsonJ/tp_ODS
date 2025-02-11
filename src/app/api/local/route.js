import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const locais = await prisma.local.findMany();
    return new Response(JSON.stringify(locais), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar locais' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { nome, endereco, capacidade, descricao } = await req.json();

    const novoLocal = await prisma.local.create({
      data: {
        nome,
        endereco,
        capacidade,
        descricao,
        categoria: "Categoria Padrão",
      },
    });

    return new Response(JSON.stringify({ message: "Local criado com sucesso", local: novoLocal }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao criar local", message: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
      const { ids } = await req.json();

      if (!ids || !Array.isArray(ids)) {
          return new Response(JSON.stringify({ error: "IDs inválidos" }), { status: 400 });
      }

      await prisma.local.deleteMany({
          where: {
              id: { in: ids },
          },
      });

      return new Response(JSON.stringify({ message: "Locais excluídos com sucesso" }), { status: 200 });
  } catch (error) {
      return new Response(JSON.stringify({ error: "Erro ao excluir locais", message: error.message }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, nome, endereco, capacidade, descricao } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID é obrigatório" }), { status: 400 });
    }

    const localAtualizado = await prisma.local.update({
      where: { id },
      data: {
        nome,
        endereco,
        capacidade,
        descricao,
      },
    });

    return new Response(
      JSON.stringify({ message: "Local atualizado com sucesso", local: localAtualizado }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar local", message: error.message }),
      { status: 500 }
    );
  }
}

