"use client";

import { useEffect, useState } from "react";
import styles from "../local.module.css"; 
import Link from "next/link";

interface Local {
    id: number;
    name: string;
    address: string;
    capacity: number;
    description: string;
}

export default function DataTable() {
    const [data, setData] = useState<Local[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]); // Para armazenar os IDs selecionados

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5001/local');
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

    // Função para deletar os locais selecionados
    const handleDelete = async () => {
        if (selectedIds.length === 0) {
            alert("Selecione ao menos um local para excluir");
            return;
        }

        const confirmDelete = window.confirm("Tem certeza de que deseja excluir os locais selecionados?");
        if (!confirmDelete) return;

        try {
            const response = await fetch('http://localhost:5001/deleteLocal', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: selectedIds }),
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir os locais");
            }

            const responseData = await response.json();
            alert(responseData.message);

            // Atualiza a tabela removendo os locais excluídos
            setData((prevData) => prevData.filter((item) => !selectedIds.includes(item.id)));
            setSelectedIds([]); // Limpa os itens selecionados
        } catch (error) {
            alert(`Erro ao excluir locais: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
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
            <h2>Excluir Local</h2>
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
                        <th>Endereço</th>
                        <th>Capacidade</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleSelect(item.id)} /></td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>{item.capacity}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.button_container}>
                <button onClick={handleDelete} className={styles.button}>Excluir Selecionados</button>

                <Link href="/local" passHref>
                    <button className={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );
}
