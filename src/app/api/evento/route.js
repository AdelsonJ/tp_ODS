import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_IMAGE = "/uploads/foto4.png";


// Para a rota GET
export async function GET(req) {
  try {
    const eventos = await prisma.evento.findMany();
    return new Response(JSON.stringify(eventos), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar eventos' }), { status: 500 });
  }
}

// Para a rota POST
export async function POST(req) {
  try {
    const {
      nome,
      data,
      hora,
      descricao,
      capacidade,
      duracao,
      id_categoria,
      user_author,
      id_local,
      id_servico,
      imagem,
    } = await req.json();

    // Verifique se todos os dados necessários foram fornecidos
    if (!nome || !data || !hora || !descricao || !capacidade || !duracao || !id_categoria || !user_author || !id_local || !id_servico) {
      return new Response(JSON.stringify({ error: "Preencha todos os campos obrigatórios" }), { status: 400 });
    }

    const imagemFinal = imagem || DEFAULT_IMAGE;

    const novoEvento = await prisma.evento.create({
      data: {
        nome,
        data,
        hora,
        descricao,
        capacidade,
        duracao,
        id_categoria,
        user_author,
        id_local,
        id_servico,
        imagem: imagemFinal,
      },
    });

    return new Response(
      JSON.stringify({ message: "Evento criado com sucesso", evento: novoEvento }),
      { status: 201 }
    );
  } catch (error) {
  console.error("Erro ao criar evento:", error.message || error);
  return new Response(
    JSON.stringify({ error: "Erro ao criar evento", message: error.message || error }),
    { status: 500 }
  );
}
}


// Para a rota DELETE
export async function DELETE(req) {
  try {
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids)) {
      return new Response(JSON.stringify({ error: "IDs inválidos" }), { status: 400 });
    }

    await prisma.evento.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return new Response(JSON.stringify({ message: "Eventos excluídos com sucesso" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao excluir eventos", message: error.message }), { status: 500 });
  }
}

// Para a rota PUT
export async function PUT(req) {
  try {
    const {
      id,
      nome,
      data,
      hora,
      descricao,
      capacidade,
      duracao,
      id_categoria,
      user_author,
      id_local,
      id_servico,
      imagem,
    } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "ID é obrigatório" }), { status: 400 });
    }

    const eventoAtualizado = await prisma.evento.update({
      where: { id },
      data: {
        nome,
        data,
        hora,
        descricao,
        capacidade,
        duracao,
        id_categoria,
        user_author,
        id_local,
        id_servico,
        imagem,
      },
    });

    return new Response(
      JSON.stringify({ message: "Evento atualizado com sucesso", evento: eventoAtualizado }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar evento", message: error.message }),
      { status: 500 }
    );
  }
}