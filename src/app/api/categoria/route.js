import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Para a rota GET
export async function GET(req) {
  try {
    const categorias = await prisma.categoria.findMany();
    return new Response(JSON.stringify(categorias), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar categorias' }), { status: 500 });
  }
}

// Se você também for permitir POST, deve definir aqui
export async function POST(req) {
  try {
    const { nome,  descricao } = await req.json();

    const novaCategoria = await prisma.categoria.create({
      data: {
        nome,
        descricao,
      },
    });

    return new Response(JSON.stringify({ message: "Categoria criada com sucesso", categoria: novaCategoria }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao criar categoria", message: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
      const { ids } = await req.json();

      if (!ids || !Array.isArray(ids)) {
          return new Response(JSON.stringify({ error: "IDs inválidos" }), { status: 400 });
      }

      await prisma.categoria.deleteMany({
          where: {
              id: { in: ids },
          },
      });

      return new Response(JSON.stringify({ message: "Categorias excluídas com sucesso" }), { status: 200 });
  } catch (error) {
      return new Response(JSON.stringify({ error: "Erro ao excluir categorias", message: error.message }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    // Parse a requisição para extrair os dados do corpo
    const { id, nome, descricao } = await req.json();

    // Verifique se o ID foi fornecido
    if (!id) {
      return new Response(JSON.stringify({ error: "ID é obrigatório" }), { status: 400 });
    }

    // Atualize o registro no banco de dados
    const categoriaAtualizado = await prisma.categoria.update({
      where: { id },
      data: {
        nome,
        descricao,
      },
    });

    return new Response(
      JSON.stringify({ message: "Categoria atualizada com sucesso", categoria: categoriaAtualizado }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar categoria", message: error.message }),
      { status: 500 }
    );
  }
}
