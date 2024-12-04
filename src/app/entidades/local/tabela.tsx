"use client";

import { useEffect, useState } from "react";
import styles from "./local.module.css"; 

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

    useEffect(() => {
        async function fetchData() {
            try {
                // Alterar para a rota correta da API do Next.js
                const response = await fetch('/api/local');
                if (!response.ok) {
                    throw new Error(`Erro na resposta: ${response.statusText}`);
                }
                const result: Local[] = await response.json();
                
                console.log(result);  // Verifique os dados recebidos aqu
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

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div className={styles.tableContainer}>
            <h2>Lista de Locais</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
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
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.endereco}</td>
                            <td>{item.capacidade}</td>
                            <td>{item.descricao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
