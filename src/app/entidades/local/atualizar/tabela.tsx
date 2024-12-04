"use client";

import { useEffect, useState } from "react";
import styles from "../local.module.css"; 
import Link from "next/link";

interface Local {
    id: number;
    nome: string;
    endereco: string;
    capacidade: number;
    descricao: string;
}

export default function DataTable() {
    const [data, setData] = useState<Local[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null); // Apenas um ID selecionado

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/local');
                if (!response.ok) {
                    throw new Error(`Erro na resposta: ${response.statusText}`);
                }
                const result: Local[] = await response.json();
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
            <h2>Selecione um Local para atualizar</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Capacidade</th>
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
                            <td>{item.endereco}</td>
                            <td>{item.capacidade}</td>
                            <td>{item.descricao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.button_container}>
                <Link href={`/entidades/local/atualizar?view=atualizar&id=${selectedId}`} passHref>
                    <button className={styles.button} disabled={!selectedId}>Continuar</button>
                </Link>

                <Link href="/entidades/local" passHref>
                    <button className={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );
}
