"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, UserProvider } from "../../../components/UserContext"
import styles from "./cadastro.module.css";
import Link from "next/link";

export default function EventoCadastro() {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [descricao, setDescricao] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [duracao, setDuracao] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [idServico, setIdServico] = useState("");
  const [idLocal, setIdLocal] = useState("");
  const [imagem, setImagem] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [locais, setLocais] = useState([]);

  const { user, setUser } = useUser();

  const router = useRouter();

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
    // Carregar categorias, serviços e locais ao montar o componente
    const fetchData = async () => {
      try {
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
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(user)

    const novoEvento = {
      nome,
      data,
      hora,
      descricao,
      capacidade: Number(capacidade),
      duracao: Number(duracao),
      id_categoria: Number(idCategoria),
      user_author: user['username'],
      id_local: Number(idLocal),
      id_servico: Number(idServico),
      imagem,
    };

    try {
      const response = await fetch("/api/evento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoEvento),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erro desconhecido");
      }

      const responseData = await response.json();
      alert(responseData.message);
      router.push("/entidades/evento");
    } catch (error: any) {
      console.error("Erro ao salvar o evento:", error);
      alert(`Erro ao salvar o evento: ${error.message}`);
    }
  };

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
