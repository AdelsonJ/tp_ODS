"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import styles from "./cadastro.module.css";
import Link from "next/link";

export default function ServicoCadastro() {
    // Estados para armazenar os dados do formulário
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descricao, setDescricao] = useState("");

    // Inicializa o useRouter
    const router = useRouter();

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e: { preventDefault: () => void}) => {
        e.preventDefault();

        const novoServico = {
            nome: nome,
            categoria: categoria,
            descricao: descricao,
        };

        try {
            const response = await fetch('/api/servico', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(novoServico)
            });

            if(!response.ok){
                console.log('eita')
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro desconhecido');
            }

            const responseData = await response.json();
            alert(responseData.message);

            // Redireciona para a página de serviços após o sucesso
            router.push('/entidades/servico');
        } catch (error: any) {
            console.error('Erro ao salvar o serviço:', error);
            alert(`Erro ao salvar o serviço: ${error.message}`);
        }
    };

    return (
        <div className={styles.container}>
        <div className={styles.container_title}>
            <h1>Criar Serviço</h1>
        </div>
        <div className={styles.container_add}>
            <h2>Serviço</h2>

            <form>
            <div className={styles.container_info}>
                <p>Nome</p>
                <div className={styles.container_text}>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome do servico"
                />
                </div>
            </div>

            <div className={styles.container_info}>
                <p>Categoria</p>
                <div className={styles.container_text}>
                <input
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    placeholder="Categoria do serviço"
                />
                </div>
            </div>

            <div className={styles.container_descricao}>
                <p>Descrição</p>
                <div className={styles.container_text}>
                <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descrição do serviço"
                />
                </div>
            </div>
            </form>
        </div>

            <div className={styles.button_container}>
                <button onClick={handleSubmit} className={styles.button}>Salvar</button>

                <Link href="/entidades/servico" passHref>
                    <button className={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );
}