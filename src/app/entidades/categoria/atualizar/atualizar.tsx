"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../cadastro/cadastro.module.css";
import Link from "next/link";

export default function AtualizarForm() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id")

    useEffect(() => {
        if (!id) {
            alert("ID não encontrado na URL");
            router.push("/entidades/categoria");
            return;
        }

        async function fetchCategorias() {
            try{
                // Requisita todas as categorias
                const response = await fetch('/api/categoria');
                if (!response.ok) {
                    throw new Error("Erro ao buscar as categorias");
                }
                const categorias = await response.json()

                // Busca a categoria com o id correspondente
                const categoria = categorias.find((categoria: any) => categoria.id === Number(id));

                if (!categoria){
                    throw new Error("Categoria não encontrada");
                }

                // Preenche os campos com os dados da categoria encontrada
                setNome(categoria.nome);
                setDescricao(categoria.descricao);
            } catch (error) {
                console.error("Erro ao carregar a categoria:", error);
                alert("Erro ao carregar a categoria");
            } finally {
                setLoading(false);
            }
        }

        fetchCategorias();
    }, [id, router]);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const novaCategoria = {
            id: Number(id),
            nome,
            descricao,
        };

        try {
            const response = await fetch('/api/categoria',{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novaCategoria),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro desconhecido");
            }
            
            const responseData = await response.json();
            alert(responseData.message);
            router.push("/entidades/categoria");
        } catch (error: any) {
            console.log("Erro ao atualizar a categoria:", error);
            alert(`Erro ao atualizar a categoria: ${error.message}`)
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return(
        <div className={styles.container}>
            <div className={styles.container_title}>
                <h1>Atualizar Categoria</h1>
            </div>

            <div className={styles.container_add}>
                <h2>Categoria</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.container_info}>
                        <label>Nome</label>
                        <div className={styles.container_text}>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Nome da categoria"
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
                        <Link href="/entidades/categoria">
                            <button type="button" className={styles.button}>Voltar</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}