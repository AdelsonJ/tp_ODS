import { useEffect, useState } from "react";
import styles from "./evento.module.css";
import Link from "next/link";

interface EventoDetalhesProps {
    id: number;
}

export default function EventoDetalhes({ id }: EventoDetalhesProps) {
    const [nome, setNome] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [descricao, setDescricao] = useState("");
    const [capacidade, setCapacidade] = useState("");
    const [duracao, setDuracao] = useState("");
    const [idCategoria, setIdCategoria] = useState("");
    const [idServico, setIdServico] = useState("");
    const [user_author, setUser_author] = useState("");
    const [idLocal, setIdLocal] = useState("");
    const [imagem, setImagem] = useState("");

    const [categorias, setCategorias] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [locais, setLocais] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            alert("ID não encontrado!");
            return;
        }

        async function fetchEventos() {
            try {
                const response = await fetch('/api/evento');
                if (!response.ok) {
                    throw new Error("Erro ao buscar os eventos");
                }
                const eventos = await response.json();

                const evento = eventos.find((evento: any) => evento.id === Number(id));

                if (!evento) {
                    throw new Error("Evento não encontrado");
                }

                setNome(evento.nome);
                setData(evento.data);
                setHora(evento.hora);
                setDescricao(evento.descricao);
                setCapacidade(evento.capacidade);
                setDuracao(evento.duracao);
                setIdCategoria(evento.id_categoria);
                setIdServico(evento.id_servico);
                setIdLocal(evento.id_local);
                setUser_author(evento.user_author);
                setImagem(evento.imagem);

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
                console.error("Erro ao carregar o evento:", error);
                alert("Erro ao carregar o evento");
            } finally {
                setLoading(false);
            }
        }

        fetchEventos();
    }, [id]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleSection}>
                <h1>Evento: {nome}</h1>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.imageSection}>
                    <img src={imagem} alt="Evento" />
                </div>
                
                <div className={styles.eventDetails}>
                    <button className={styles.inscricaoButton}>Se inscreva</button>
                    <div className={styles.frame}>
                        <div><strong>Data:</strong> {data}</div>
                        <div><strong>Hora:</strong> {hora}</div>
                        <div><strong>Endereço:</strong>{locais.find((l) => l.id === parseInt(idLocal))?.nome || "Local não encontrado"}</div>
                    </div>
                </div>
            </div>

            <div className={styles.descriptionSection}>
                <h2>Descrição</h2>
            </div>
            <div className={styles.paragraph}>
                <p>{descricao}</p>
            </div>
            

            <div className={styles.servicesSection}>
                <h2>Serviços</h2>
            </div>
            <div className={styles.paragraph}>
                <p>{servicos.find((s) => s.id === parseInt(idServico))?.nome || "Servico não encontrado"}</p>
            </div>

            <div className={styles.categorySection}>
                <h2>Categoria</h2>
            </div>
            <div className={styles.paragraph}>
                <p>{categorias.find((c) => c.id === parseInt(idCategoria))?.nome || "Categoria não encontrado"}</p>
            </div>

            <div className={styles.button_container}>
                <Link href={`/entidades/evento/atualizar?view=atualizar&id=${id}`} passHref>
                    <button className={styles.button} disabled={!id}>Alterar Informações</button>
                </Link>
                <Link href="/entidades/evento" passHref>
                    <button className={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );
}