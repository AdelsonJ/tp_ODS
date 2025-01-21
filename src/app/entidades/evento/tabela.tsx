"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    imagem: string; // Assume que a imagem é parte dos dados do evento
}

export default function EventoDataTable() {
    const [data, setData] = useState<Evento[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [categorias, setCategorias] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [locais, setLocais] = useState([]);

    const router = useRouter(); // Hook para navegação

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/evento");
                if (!response.ok) {
                    throw new Error(`Erro na resposta: ${response.statusText}`);
                }
                const result: Evento[] = await response.json();
                setData(result);

                const [categoriasRes, servicosRes, locaisRes] = await Promise.all([
                    fetch("/api/categoria"),
                    fetch("/api/servico"),
                    fetch("/api/local"),
                ]);

                const categoriasData = await categoriasRes.json();
                const servicosData = await servicosRes.json();
                const locaisData = await locaisRes.json();

                setCategorias(categoriasData);
                setServicos(servicosData);
                setLocais(locaisData);

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

    const filteredData = data.filter((item) =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerBarraPesquisa}>
                <input
                    type="text"
                    placeholder="Pesquisar pelo nome"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchBar}
                />
            </div>

            <div className={styles.cardsContainer}>
                {filteredData.map((item) => (
                    <div
                        key={item.id}
                        className={styles.card}
                        onClick={() => router.push(`/entidades/evento/pagina?id=${item.id}`)}
                    >
                        <img
                            src={item.imagem} // Assume que a imagem está sendo fornecida no evento
                            alt={item.nome}
                            className={styles.cardImage}
                        />
                        <div className={styles.cardContent}>
                            <h3>{item.nome}</h3>

                            <div className={styles.cardFooter}>
                                <div className={styles.dateBox}>
                                    <div className={styles.dateHeader}>
                                        {new Date(item.data).toLocaleString('pt-BR', { month: 'long' })}
                                    </div>
                                    <div className={styles.dateDay}>
                                        {new Date(item.data).toLocaleString('pt-BR', { day: '2-digit' })}
                                    </div>
                                </div>

                                <div className={styles.cardDetails}>
                                    <div>Início: {item.hora}</div>
                                    <div>Duração: {item.duracao} min</div>
                                    <div>Endereço: {locais.find((l) => l.id === parseInt(item.id_local))?.nome || "Local não encontrado"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
