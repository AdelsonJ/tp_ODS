"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import styles from "./cadastro.module.css";
import Link from "next/link";

export default function LocalCadastro() {
    // Estados para armazenar os dados do formulário
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [capacity, setCapacidade] = useState("");
    const [description, setDescricao] = useState("");

    // Inicializa o useRouter
    const router = useRouter();

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const novoLocal = {
            id: Date.now(),
            name: nome,
            address: endereco,
            capacity: Number(capacity),
            description: description,
        };

        try {
            const response = await fetch('http://localhost:5001/saveLocal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoLocal),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro desconhecido');
            }

            const responseData = await response.json();
            alert(responseData.message);

            // Redireciona para a página de locais após o sucesso
            router.push('/entidades/local');  // Redireciona para a página principal de locais
        } catch (error: any) {
            console.error('Erro ao salvar o local:', error);
            alert(`Erro ao salvar o local: ${error.message}`);
        }
    };

    return (
        <div className={styles.container}>
        <div className={styles.container_title}>
            <h1>Criar Local</h1>
        </div>
        <div className={styles.container_add}>
            <h2>Local</h2>

            <form>
            <div className={styles.container_info}>
                <p>Nome</p>
                <div className={styles.container_text}>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome do local"
                />
                </div>
            </div>

            <div className={styles.container_info}>
                <p>Endereço</p>
                <div className={styles.container_text}>
                <input
                    type="text"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    placeholder="Endereço do local"
                />
                </div>
            </div>

            <div className={styles.container_info}>
                <p>Capacidade</p>
                <div className={styles.container_text}>
                <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacidade(e.target.value)}
                    placeholder="Capacidade do local"
                />
                </div>
            </div>

            <div className={styles.container_description}>
                <p>Descrição</p>
                <div className={styles.container_text}>
                <textarea
                    value={description}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descrição do local"
                />
                </div>
            </div>
            </form>
        </div>

            <div className={styles.button_container}>
                <button onClick={handleSubmit} className={styles.button}>Salvar</button>

                <Link href="/entidades/local" passHref>
                    <button className={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );
}
