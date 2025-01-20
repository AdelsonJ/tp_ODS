"use client";

import { useEffect, useState } from "react";
import styles from "./evento.module.css";

interface Evento {
    id: number;
    nome: string;
    data: string;
    local: string;
    categoria: string;
    descricao: string;
    capacidade: string;
    duracao: string;
}

export default function EventoDataTable() {
    const [data, setData] = useState<Evento[]>([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/evento');
                if (!response.ok) {
                    throw new Error(`Erro na resposta: ${response.statusText}`);
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

    // Função para filtrar os dados com base no valor da barra de pesquisa
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
            <h2>Lista de Eventos</h2>
            
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
                    {filteredData.map((item) => (
                        <tr key={item.id}>
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
        </div>
    );
}
