"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../cadastro/cadastro.module.css";
import Link from "next/link";

export default function AtualizarForm() {
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descricao, setDescricao] = useState("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // Obtém o valor de "id" da URL

    useEffect(() => {
        if (!id) {
            alert("ID não encontrado na URL");
            router.push("/entidades/servico");
            return;
        }

        async function fetchLocais() {
            try {
                // Requisita todos os locais
                const response = await fetch('/api/servico');
                if (!response.ok) {
                    throw new Error("Erro ao buscar os locais");
                }
                const locais = await response.json();

                // Busca o servico com o id correspondente
                const servico = locais.find((servico: any) => servico.id === Number(id));

                if (!servico) {
                    throw new Error("Servico não encontrado");
                }

                // Preenche os campos com os dados do servico encontrado
                setNome(servico.nome);
                setCategoria(servico.categoria);
                setDescricao(servico.descricao);
            } catch (error) {
                console.error("Erro ao carregar o servico:", error);
                alert("Erro ao carregar o servico");
            } finally {
                setLoading(false);
            }
        }

        fetchLocais();
    }, [id, router]);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const novoServico = {
            id: Number(id),
            nome,
            categoria,
            descricao,
        };

        try {
            const response = await fetch(`/api/servico`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novoServico),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro desconhecido");
            }

            const responseData = await response.json();
            alert(responseData.message);
            router.push("/entidades/servico");
        } catch (error: any) {
            console.error("Erro ao atualizar o servico:", error);
            alert(`Erro ao atualizar o servico: ${error.message}`);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.container_title}>
                <h1>Atualizar Servico</h1>
            </div>

            <div className={styles.container_add}>
                <h2>Servico</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.container_info}>
                        <label>Nome</label>
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
                        <label>Categoria</label>

                        <div className={styles.container_text}>
                            <input
                                type="text"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                placeholder="Categoria do servico"
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
                        <Link href="/entidades/servico">
                            <button type="button" className={styles.button}>Voltar</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
