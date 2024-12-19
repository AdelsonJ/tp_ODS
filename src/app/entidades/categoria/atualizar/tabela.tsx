"use client";

import { useEffect, useState } from "react";
import styles from "../categoria.module.css"; 
import Link from "next/link";

interface Categoria {
    id: number;
    nome: string;
    descricao: string;
}

export default function DataTable(){
    const [data, setData] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

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

    // Função para lidar com a seleção de um checkbox
    const handleSelect = (id: number) => {
        setSelectedId((prevSelectedId) => (prevSelectedId === id ? null : id)); // Alterna entre selecionar e deselecionar
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div className={styles.tableContainer}>
            <h2>Selecione uma categoria para atualizar</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <input
                                    type="radio" // Alterado para rádio
                                    checked={selectedId === item.id} // Verifica se é o selecionado
                                    onChange={() => handleSelect(item.id)}
                                />
                            </td>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.button_container}>
                <Link href={`/entidades/categoria/atualizar?view=atualizar&id=${selectedId}`} passHref>
                    <button className={styles.button} disabled={!selectedId}>Continuar</button>
                </Link>

                <Link href="/entidades/categoria" passHref>
                    <button className={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );
}