import { useEffect, useState } from "react";
import styles from "./evento.module.css";
import Link from "next/link";
import { useUser } from "../../../components/UserContext"
import { stringify } from "querystring";

interface EventoDetalhesProps {
    id: number;
}

interface Inscricao {
    id: number;
    id_evento: number;
    user_author: string;
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
    const [selectedId, setSelectedId] = useState<number[]>([]);

    const [categorias, setCategorias] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [locais, setLocais] = useState([]);
    const [inscricoes, setInscricoes] = useState([]);
    const { user } = useUser();

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

                const [categoriasRes, servicosRes, locaisRes, inscricoesRes] = await Promise.all([
                    fetch("/api/categoria"),
                    fetch("/api/servico"),
                    fetch("/api/local"),
                    fetch("/api/inscricao"),
                ]);

                const categoriasData = await categoriasRes.json();
                const servicosData = await servicosRes.json();
                const locaisData = await locaisRes.json();
                const inscricoesData = await inscricoesRes.json();

                setCategorias(categoriasData);
                setServicos(servicosData);
                setLocais(locaisData);
                setInscricoes(inscricoesData);
            } catch (error) {
                console.error("Erro ao carregar o evento:", error);
                alert("Erro ao carregar o evento");
            } finally {
                setLoading(false);
            }
        }

        fetchEventos();
    }, [id]);

    const handleDelete = async() => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir o evento?");
        if (!confirmDelete) return;

        try {
            const response = await fetch('/api/evento', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ ids: [id] }),
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir evento.")
            };

            const responseData = await response.json();
            alert(responseData.message)

        } catch (error) {
            alert(`Erro ao excluir eventos: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }
    };

    const handleDeleteInscricao = async() => {
        const confirmDelete = window.confirm("Tem certeza que deseja cancelar a inscrição?");
        if (!confirmDelete) return;
        console.log(id)
        console.log(user['username'])

        try {
            const response = await fetch('/api/inscricao', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ id_evento: id, user_author: user['username'] }),
            }); 

            if (!response.ok) {
                throw new Error("Erro ao cancelar inscrição!.")
            };

            const responseData = await response.json();
            alert(responseData.message)
            window.location.reload();
        } catch (error) {
            alert(`Erro ao cancelar inscrição: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }
    };

    const handleInscricao = async () => {
        try {
            const response = await fetch("/api/inscricao", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_author: user['username'], id_evento: id }),
            });
    
            const data = await response.json();
            alert(data.message || data.error);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao se inscrever:", error);
            alert("Erro ao se inscrever no evento.");
        }
    };
    

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
                {!inscricoes.find((inscricao) => 
                    inscricao.id_evento === parseInt(id) && 
                    inscricao.user_author === user['username']
                ) ? (
                    <button className={styles.inscricaoButton} onClick={handleInscricao}>Se inscreva</button>
                ) : 
                    <>
                    <h3>Você ja está inscrito nesse evento!</h3>
                    <button className={styles.cancelarButton} onClick={handleDeleteInscricao}>Cancelar inscrição</button>
                    </>
                }
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
                {user['username'] === user_author ? (
                    <p>oi</p>
                ) : (
                    <p>tchau</p>
                )}
                <Link href="/entidades/evento" passHref>
                    <button className={styles.button} onClick={handleDelete}>Deletar evento</button>
                </Link>
                <Link href="/entidades/evento" passHref>
                    <button className={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );
}