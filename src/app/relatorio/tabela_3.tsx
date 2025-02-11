"use client";

import { useEffect, useState } from "react";
import styles from "./report.module.css"; 

interface Usuario {
    username: string;
    tipo: string;
    eventos: string[]; // Deve ser um vetor de strings
    inscricoes: string[]; // Deve ser um vetor de strings
}

export default function DataTable3() {
    const [data, setData] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/usuario');
                
                if (!response.ok) {
                    throw new Error(`Erro na resposta: ${response.statusText}`);
                }
                const result: Usuario[] = await response.json();
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
            <h2>Tabela de usuários </h2>
            
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Tipo</th>
                        <th>Eventos</th>
                        <th>Inscrições</th>  
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.username}>
                            <td>{item.username}</td>
                            <td>{item.tipo}</td>
                            <td>{Array.isArray(item.eventos) ? item.eventos.length : 0}</td> {/* Eventos organizados */}
                            <td>{Array.isArray(item.inscricoes) ? item.inscricoes.length : 0}</td> {/* Inscrições */}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
