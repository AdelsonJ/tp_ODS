"use client";

import { useEffect, useState } from "react";
import styles from "../evento.module.css"; 
import Link from "next/link";

interface Evento {
    id: number;
    nome: string;
    data: string;
    local: string;
    descricao: string;
    capacidade: number;
    duracao: number;
    categoria: string;
    servico: string;
}

export default function DataTable() {
    const [data, setData] = useState<Evento[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Requisita todos os eventos
                const response = await fetch('/api/evento');
                if (!response.ok) {
                    throw new Error("Erro ao buscar os eventos");
                }
                const result: Evento[] = await response.json();
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

    const handleSelect = (id: number) => {
        setSelectedId((prevSelectedId) => (prevSelectedId === id ? null : id));
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div className={styles.tableContainer}>
            <h2>Selecione um evento para atualizar</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Local</th>
                        <th>Descrição</th>
                        <th>Capacidade</th>
                        <th>Duração</th>
                        <th>Categoria</th>
                        <th>Serviço</th>
                        <th>Autor</th>
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
                            <td>{item.id_local}</td>
                            <td>{item.descricao}</td>
                            <td>{item.capacidade}</td>
                            <td>{item.duracao}</td>
                            <td>{item.id_categoria}</td>
                            <td>{item.id_servico}</td>
                            <td>{item.user_author}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.button_container}>
                <Link href={`/entidades/evento/atualizar?view=atualizar&id=${selectedId}`} passHref>
                    <button className={styles.button} disabled={!selectedId}>Continuar</button>
                </Link>

                <Link href="/entidades/evento" passHref>
                    <button className={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );

}
