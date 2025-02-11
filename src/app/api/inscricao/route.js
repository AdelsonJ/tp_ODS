import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { user_author, id_evento } = await req.json();
    console.log(user_author)
    console.log(id_evento)

    const eventoId = parseInt(id_evento, 10);

    if (!user_author || !eventoId) {
      return new Response(JSON.stringify({ error: "Dados inválidos" }), { status: 400 });
    }

    // Verifica se o usuário já está inscrito no evento
    const inscricaoExistente = await prisma.inscricao.findFirst({
      where: { user_author, id_evento: eventoId },
    });

    if (inscricaoExistente) {
      return new Response(JSON.stringify({ error: "Usuário já inscrito" }), { status: 400 });
    }

    // Cria a inscrição
    const novaInscricao = await prisma.inscricao.create({
      data: {
        user_author,
        id_evento: eventoId,
        data: new Date().toISOString().split("T")[0], // Apenas a data (YYYY-MM-DD)
        hora: new Date().toLocaleTimeString(), // Hora local
      },
    });

    return new Response(JSON.stringify({ message: "Inscrição realizada com sucesso", inscricao: novaInscricao }), { status: 201 });
  } catch (error) {
    console.error("Erro ao realizar inscrição:", error.message);
    return new Response(JSON.stringify({ error: "Erro ao realizar inscrição" }), { status: 500 });
  }
}

export async function GET() {
try {
        const inscricoes = await prisma.inscricao.findMany();

        return new Response(JSON.stringify(inscricoes), { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar inscrições:", error.message);
        return new Response(JSON.stringify({ error: "Erro ao buscar inscrições" }), { status: 500 });
    }
}

export async function DELETE(req) {
  try {
    console.log('banana')
    const { id_evento, user_author } = await req.json();
    console.log(id_evento)
    console.log(user_author)
    
    if (!id_evento || !user_author) {
      return new Response(JSON.stringify({ error: "Parâmetros inválidos" }), { status: 400 });
    }

    await prisma.inscricao.deleteMany({
      where: {
        id_evento: Number(id_evento),
        user_author: user_author,
      },
    });

    return new Response(JSON.stringify({ message: "Inscrição excluída com sucesso" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

  
