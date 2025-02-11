"use client";

import { useEffect, useState } from "react";
import styles from "./report.module.css"; 

interface Usuario {
    id: number;
    nome: string;
    capacidade: number;
    descricao: string;
    inscricoes: string[]; // Deve ser um vetor de strings
}

export default function DataTable2() {
    const [data, setData] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/evento');
                
                if (!response.ok) {
                    throw new Error(`Erro na resposta: ${response.statusText}`);
                }
                const result: Usuario[] = await response.json();
                setData(result);

                setData(result);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
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
            <h2>Tabela de Eventos</h2>
            
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Nome </th>
                        <th> Descrição </th>
                        <th> Inscrições </th>  
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        // Verifique se o campo "inscricoes" está disponível
                        const numeroInscricoes = Array.isArray(item.inscricoes) ? item.inscricoes.length : 0;
                        const capacidade = item.capacidade ?? 0;  // Verifique se a capacidade é válida
                        
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td>
                                    {`${numeroInscricoes} / ${capacidade}`}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
