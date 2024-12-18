import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

// Para a rota GET
export async function GET(req) {
  try {
    const usuarios = await prisma.usuario.findMany();
    return new Response(JSON.stringify(usuarios), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar usuarios' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { nome, data_nasc, email, username, senha } = await req.json();

    // Verifique se todos os campos obrigatórios foram fornecidos
    if (!nome || !data_nasc || !email || !username || !senha) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400 }
      );
    }

    // Calcular a idade com base na data de nascimento
    const idade = calcularIdade(data_nasc);

    // Criar o hash da senha usando bcrypt
    const salt = bcrypt.genSaltSync(10); 
    const hashedPassword = bcrypt.hashSync(senha, salt); 

    // Criar o usuário no banco de dados com a senha criptografada
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        data_nasc,
        email,
        username,
        senha: hashedPassword, // Armazena a senha criptografada
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
  
// Função para calcular a idade com base na data de nascimento
function calcularIdade(dataNasc) {
    const hoje = new Date();
    const nascimento = new Date(dataNasc);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();

    // Se o mês de nascimento ainda não passou neste ano, subtrai 1 da idade
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

    // Verifique se o ID foi fornecido
    if (!username) {
      return new Response(
        JSON.stringify({ error: "Usuario é obrigatório" }),
        { status: 400 }
      );
    }

    // Se a senha for fornecida, cria um novo hash
    let hashedPassword = undefined;
    if (senha) {
      const salt = bcrypt.genSaltSync(10);
      hashedPassword = bcrypt.hashSync(senha, salt); // Gera o hash da nova senha
    }

    // Atualize o registro no banco de dados
    const usuarioAtualizado = await prisma.usuario.update({
      where: { username },
      data: {
        nome,
        data_nasc,
        email,
        username,
        senha: hashedPassword ? hashedPassword : undefined, // Se a senha não for fornecida, não atualiza
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

