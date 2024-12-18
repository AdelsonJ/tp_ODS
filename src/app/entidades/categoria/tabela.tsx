"use client";

import { useEffect, useState } from "react";
import styles from "./categoria.module.css"; 

interface Categoria {
    id: number;
    nome: string;
    descricao: string;
}

export default function DataTable() {
    const [data, setData] = useState<Categoria[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    const filteredData = data.filter(item => 
        item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div className={styles.tableContainer}>
            <h2>Lista de Categorias</h2>

            <div className={styles.containerBarraPesquisa}>
                {/* Barra de pesquisa */}
                <input
                    type="text"
                    placeholder="Pesquisar pelo nome"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchBar}
                />
            </div>
            
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>  
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}