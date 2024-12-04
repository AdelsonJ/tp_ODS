"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./atualizar.module.css";
import Link from "next/link";

export default function AtualizarForm() {
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [capacidade, setCapacidade] = useState("");
    const [descricao, setDescricao] = useState("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // Obtém o valor de "id" da URL

    useEffect(() => {
        if (!id) {
            alert("ID não encontrado na URL");
            router.push("/entidades/local");
            return;
        }

        async function fetchLocais() {
            try {
                // Requisita todos os locais
                const response = await fetch('/api/local');
                if (!response.ok) {
                    throw new Error("Erro ao buscar os locais");
                }
                const locais = await response.json();

                // Busca o local com o id correspondente
                const local = locais.find((local: any) => local.id === Number(id));

                if (!local) {
                    throw new Error("Local não encontrado");
                }

                // Preenche os campos com os dados do local encontrado
                setNome(local.nome);
                setEndereco(local.endereco);
                setCapacidade(local.capacidade.toString());
                setDescricao(local.descricao);
            } catch (error) {
                console.error("Erro ao carregar o local:", error);
                alert("Erro ao carregar o local");
            } finally {
                setLoading(false);
            }
        }

        fetchLocais();
    }, [id, router]);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const novoLocal = {
            id: Number(id),
            nome,
            endereco,
            capacidade: Number(capacidade),
            descricao,
        };

        try {
            const response = await fetch(`/api/local`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novoLocal),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro desconhecido");
            }

            const responseData = await response.json();
            alert(responseData.message);
            router.push("/entidades/local");
        } catch (error: any) {
            console.error("Erro ao atualizar o local:", error);
            alert(`Erro ao atualizar o local: ${error.message}`);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.container_title}>
                <h1>Atualizar Local</h1>
            </div>

            <div className={styles.container_add}>
                <h2>Local</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.container_info}>
                        <label>Nome</label>
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
                        <label>Endereço</label>

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
                        <label>Capacidade</label>

                        <div className={styles.container_text}>
                        <input
                            type="number"
                            value={capacidade}
                            onChange={(e) => setCapacidade(e.target.value)}
                            placeholder="Capacidade"
                        />
                        </div>
                    </div>
                    <div className={styles.container_descricao}>
                        <label>Descrição</label>
                        <div className={styles.container_text}>
                            <textarea
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descrição"
                            />
                        </div>
                    </div>
                    <div className={styles.button_container}>
                        <button type="submit" className={styles.button}>Salvar</button>
                        <Link href="/entidades/local">
                            <button type="button" className={styles.button}>Voltar</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
