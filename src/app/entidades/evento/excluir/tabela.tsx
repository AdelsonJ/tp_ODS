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
    const [data, setData] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]); // Para armazenar os IDs selecionados

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

    // Função para deletar os eventos selecionados
    const handleDelete = async () => {
        if (selectedIds.length === 0) {
            alert("Selecione ao menos um evento para excluir");
            return;
        }

        const confirmDelete = window.confirm("Tem certeza de que deseja excluir os eventos selecionados?");
        if (!confirmDelete) return;
        
        try {
            const response = await fetch('/api/evento', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: selectedIds }),
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir os eventos");
            }

            const responseData = await response.json();
            alert(responseData.message);

            // Atualiza a tabela removendo os eventos excluídos
            setData((prevData) => prevData.filter((item) => !selectedIds.includes(item.id)));
            setSelectedIds([]); // Limpa os itens selecionados
        } catch (error) {
            alert(`Erro ao excluir eventos: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
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
            <h2>Excluir Evento</h2>
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
                            <td><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleSelect(item.id)} /></td>
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
                <button onClick={handleDelete} className={styles.button}>Excluir Selecionados</button>

                <Link href="/entidades/evento" passHref>
                    <button className={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );
}
