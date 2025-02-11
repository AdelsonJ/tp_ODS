"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../components/UserContext";
import styles from "../../entidades/evento/evento.module.css";

interface Evento {
    id: number;
    nome: string;
    data: string;
    local: string;
    categoria: string;
    descricao: string;
    capacidade: string;
    user_author: string;
    duracao: string;
    imagem: string;
}

interface Inscricao {
    id: number;
    id_evento: number;
    user_author: string;
}

export default function Page() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [eventosInscritos, setEventosInscritos] = useState<Evento[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                // Buscar eventos criados pelo usuário
                const eventosRes = await fetch("/api/evento");
                if (!eventosRes.ok) throw new Error(`Erro: ${eventosRes.statusText}`);
                const eventosData: Evento[] = await eventosRes.json();
                setEventos(eventosData);

                // Buscar inscrições do usuário
                const inscricoesRes = await fetch("/api/inscricao");
                if (!inscricoesRes.ok) throw new Error(`Erro: ${inscricoesRes.statusText}`);
                const inscricoesData: Inscricao[] = await inscricoesRes.json();

                // Filtrar eventos em que o usuário está inscrito
                const eventosFiltrados = eventosData.filter(evento =>
                    inscricoesData.some(inscricao => inscricao.user_author === user.username && inscricao.id_evento === evento.id)
                );

                setEventosInscritos(eventosFiltrados);
            } catch (error) {
                if (error instanceof Error) setError(error.message);
                else setError("Erro desconhecido");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [user.username]);

    const eventosCriados = eventos.filter(
        (item) => item.user_author === user.username && item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className={styles.eventContainer}>
            <div className={styles.headerContainer}>
                <h1 className={styles.header}>Bem-vindo, {user.username}!</h1>
                <div className={styles.createContainer}>
                    <span>Já criou seu evento?</span>
                    <Link href="/entidades/evento/cadastro" passHref>
                        <button className={styles.button}>Criar Evento</button>
                    </Link>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <h2>Meus Eventos:</h2>
                {eventosCriados.length === 0 ? (
                    <p className={styles.noEvents}>Nenhum evento encontrado.</p>
                ) : (
                    <ul className={styles.eventList}>
                        {eventosCriados.map((item) => (
                            <li key={item.id} className={styles.eventItem} onClick={() => router.push(`/entidades/evento/pagina?id=${item.id}`)}>
                                <h3>{item.nome}</h3>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className={styles.tableContainer}>
                <h2>Eventos Inscritos:</h2>
                {eventosInscritos.length === 0 ? (
                    <p className={styles.noEvents}>Você não está inscrito em nenhum evento.</p>
                ) : (
                    <ul className={styles.eventList}>
                        {eventosInscritos.map((item) => (
                            <li key={item.id} className={styles.eventItem} onClick={() => router.push(`/entidades/evento/pagina?id=${item.id}`)}>
                                <h3>{item.nome}</h3>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
