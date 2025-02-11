import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        eventos: true,
        inscricoes: {
          include: {
            evento: true 
          }
        }
      }
    });
    
    return new Response(JSON.stringify(usuarios), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar usuarios' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { nome, data_nasc, email, username, senha } = await req.json();

    if (!nome || !data_nasc || !email || !username || !senha) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400 }
      );
    }

    const idade = calcularIdade(data_nasc);

    const salt = bcrypt.genSaltSync(10); 
    const hashedPassword = bcrypt.hashSync(senha, salt); 

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        data_nasc,
        email,
        username,
        senha: hashedPassword, 
        tipo: "comum",
        idade,
      },
    });

    return new Response(
      JSON.stringify({ message: "Usuário criado com sucesso", usuario: novoUsuario }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao criar usuário", message: error.message }),
      { status: 500 }
    );
  }
}

function calcularIdade(dataNasc) {
    const hoje = new Date();
    const nascimento = new Date(dataNasc);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}

export async function DELETE(req) {
  try {
      const { username } = await req.json();

      if (!username || !Array.isArray(username)) {
          return new Response(JSON.stringify({ error: "Usuarios inválidos" }), { status: 400 });
      }

      await prisma.usuario.deleteMany({
          where: {
              username: { in: username },
          },
      });

      return new Response(JSON.stringify({ message: "Usarios excluídos com sucesso" }), { status: 200 });
  } catch (error) {
      return new Response(JSON.stringify({ error: "Erro ao excluir usuarios", message: error.message }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { nome, data_nasc, email, username, senha } = await req.json();

    if (!username) {
      return new Response(
        JSON.stringify({ error: "Usuario é obrigatório" }),
        { status: 400 }
      );
    }

    let hashedPassword = undefined;
    if (senha) {
      const salt = bcrypt.genSaltSync(10);
      hashedPassword = bcrypt.hashSync(senha, salt); 
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { username },
      data: {
        nome,
        data_nasc,
        email,
        username,
        senha: hashedPassword ? hashedPassword : undefined, 
      },
    });

    return new Response(
      JSON.stringify({ message: "Usuário atualizado com sucesso", usuario: usuarioAtualizado }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar usuário", message: error.message }),
      { status: 500 }
    );
  }
}