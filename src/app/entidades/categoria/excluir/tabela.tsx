"use client";

import { useEffect, useState } from "react";
import styles from "../categoria.module.css"; 
import Link from "next/link";

interface Categoria {
    id: number;
    nome: string;
    descricao: string;
}

export default function DataTable() {
    const [data, setData] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/categoria');
                if (!response.ok) {
                    throw new Error(`Erro na resposta: ${response.statusText}`);
                }
                const result: Categoria[] = await response.json();
                setData(result);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Erro desconhecido");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Função para lidar com a seleção de checkboxes
    const handleSelect = (id: number) => {
        setSelectedIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter((selectedId) => selectedId !== id); // Deselect
            } else {
                return [...prevSelectedIds, id]; // Select
            }
        });
    };

    // Função para deletar os servicos selecionados
    const handleDelete = async () => {
        if (selectedIds.length === 0) {
            alert("Selecione ao menos uma categoria para excluir");
            return;
        }

        const confirmDelete = window.confirm("Tem certeza de que deseja excluir as categorias selecionadas?");
        if (!confirmDelete) return;

        try {
            const response = await fetch('/api/categoria', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: selectedIds }),
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir as categorias");
            }

            const responseData = await response.json();
            alert(responseData.message);

            // Atualiza a tabela removendo as categorias excluídas
        } catch (error) {
            alert(`Erro ao excluir categorias: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div className={styles.tableContainer}>
            <h2>Excluir Categoria</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th><input type="checkbox" onChange={(e) => {
                            if (e.target.checked) {
                                setSelectedIds(data.map((item) => item.id)); // Seleciona todos
                            } else {
                                setSelectedIds([]); // Deselect all
                            }
                        }} checked={selectedIds.length === data.length} /></th>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleSelect(item.id)} /></td>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.button_container}>
                <button onClick={handleDelete} className={styles.button}>Excluir Selecionados</button>

                <Link href="/entidades/categoria" passHref>
                    <button className={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );
}