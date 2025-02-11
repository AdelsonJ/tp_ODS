"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../cadastro/cadastro.module.css";
import Link from "next/link";

export default function AtualizarForm() {
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
    const [loading, setLoading] = useState(true);

    const [categorias, setCategorias] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [locais, setLocais] = useState([]);

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // Obtém o valor de "id" da URL

    const imagens = [
        "/eventos/anonovo.jpg",
        "/eventos/casamento.jpg",
        "/eventos/churrasco.jpg",
        "/eventos/festainfantil.jpg",
        "/eventos/halloween.jpg",
        "/eventos/noitedefilmes.jpg",
        "/eventos/quinzeanos.jpg",
        "/eventos/show.jpg",
        "/eventos/restaurante.jpg",
        "/eventos/lanchonete.jpg",
    ];

    useEffect(() => {
        if (!id) {
            alert("ID não encontrado na URL");
            router.push("/entidades/evento");
            return;
        }

        async function fetchEventos() {
            try {
                // Requisita todos os eventos
                const response = await fetch('/api/evento');
                if (!response.ok) {
                    throw new Error("Erro ao buscar os eventos");
                }
                const eventos = await response.json();

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

                // Busca o evento com o id correspondente
                const evento = eventos.find((evento: any) => evento.id === Number(id));

                if (!evento) {
                    throw new Error("Evento não encontrado");
                }

                // Preenche os campos com os dados do evento encontrado
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
                setImagem(evento.imagem)

            } catch (error) {
                console.error("Erro ao carregar o evento:", error);
                alert("Erro ao carregar o evento");
            } finally {
                setLoading(false);
            }
        }

        fetchEventos();
    }, [id, router]);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const novoEvento = {
          id: Number(id),
          nome,
          data,
          hora,
          descricao,
          capacidade: Number(capacidade),
          duracao: Number(duracao),
          id_categoria: Number(idCategoria),
          user_author,
          id_local: Number(idLocal),
          id_servico: Number(idServico),
          imagem,
        };

        try {
            const response = await fetch(`/api/evento`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novoEvento),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro desconhecido");
            }

            const responseData = await response.json();
            alert(responseData.message);
            router.push("/entidades/evento");
        } catch (error: any) {
            console.error("Erro ao atualizar o evento:", error);
            alert(`Erro ao atualizar o evento: ${error.message}`);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={styles.container}>
          <div className={styles.container_title}>
            <h1>Criar Evento</h1>
          </div>
          <div className={styles.container_add}>
            <h2>Evento</h2>
            <form onSubmit={handleSubmit}>
    
              <div className={styles.container_info}>
                <p>Nome</p>
                <div className={styles.container_text}>  
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome do evento"
                  />
                </div>
              </div>
              
              <div className={styles.container_info}>
                <p>Data</p>
                <div className={styles.container_text}>
                  <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>
              </div>
    
              <div className={styles.container_info}>
                <p>Hora</p>
                <div className={styles.container_text}>
                  <input
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                  />
                </div>
              </div>
    
              <div className={styles.container_info}>
                <p>Descrição</p>
                  <div className={styles.container_text}>
                    <textarea
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      placeholder="Descrição do evento"
                    />
                  </div>
              </div>
    
              <div className={styles.container_info}>
                <p>Capacidade</p>
                  <div className={styles.container_text}>
                    <input
                      type="number"
                      value={capacidade}
                      onChange={(e) => setCapacidade(e.target.value)}
                      placeholder="Capacidade do evento"
                    />
                  </div>
              </div>
    
              <div className={styles.container_info}>
                <p>Duração</p>
                  <div className={styles.container_text}>
                    <input
                      type="number"
                      value={duracao}
                      onChange={(e) => setDuracao(e.target.value)}
                      placeholder="Duração do evento"
                    />
                  </div>
              </div>
    
              <div className={styles.container_info}>
                <p>Categoria</p>
                <div className={styles.container_text}>
                    <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
                      <option value="">Selecione uma categoria</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nome}
                        </option>
                      ))}
                    </select>
                </div>
              </div>
    
              <div className={styles.container_info}>
                <p>Serviço</p>
                <div className={styles.container_text}>
                    <select value={idServico} onChange={(e) => setIdServico(e.target.value)}>
                      <option value="">Selecione um serviço</option>
                      {servicos.map((servico) => (
                        <option key={servico.id} value={servico.id}>
                          {servico.nome}
                        </option>
                      ))}
                    </select>
                </div>
              </div>
    
              <div className={styles.container_info}>
                <p>Local</p>
                <div className={styles.container_text}>
                    <select value={idLocal} onChange={(e) => setIdLocal(e.target.value)}>
                      <option value="">Selecione um local</option>
                      {locais.map((local) => (
                        <option key={local.id} value={local.id}>
                          {local.nome}
                        </option>
                      ))}
                    </select>
                </div>
              </div>
    
              <div className={styles.container_info}>
                  <p>Imagem</p>
                  <div className={styles.container_text}>
                    <select value={imagem} onChange={(e) => setImagem(e.target.value)}>
                      <option value="">Selecione uma imagem</option>
                      {imagens.map((img, index) => (
                        <option key={index} value={img}>
                          {img.split("/").pop()} {/* Exibe apenas o nome do arquivo */}
                        </option>
                      ))}
                    </select>
                  </div>
              </div>
              {imagem && (
                <div className={styles.preview}>
                  <p>Prévia da Imagem</p>
                  <img src={imagem} alt="Prévia" className={styles.full_image}/>
                </div>
              )}
    
              <div className={styles.button_container}>
                <button type="submit" className={styles.button}>
                  Salvar
                </button>
                <Link href="/entidades/evento" passHref>
                  <button type="button" className={styles.button}>
                    Voltar
                  </button>
                </Link>
              </div>
    
            </form>
          </div>
        </div>
    );
}
