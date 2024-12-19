"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./cadastro.module.css";
import Link from "next/link";

export default function LocalCadastro() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [descricao, setDescricao] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const novoLocal = {
      nome,
      endereco,
      capacidade: Number(capacidade),
      descricao,
    };
  
    try {
      const response = await fetch('/api/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoLocal),
      });
  
      if (!response.ok) {
        const errorData = await response.text();  // Pega a resposta como texto
        throw new Error(errorData || 'Erro desconhecido');
      }
  
      const responseData = await response.json();  // Tenta converter para JSON se a resposta for válida
      alert(responseData.message);
      router.push('/dashboard/locais/');
    } catch (error: any) {
      console.error('Erro ao salvar o local:', error);
      alert(`Erro ao salvar o local: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_title}>
        <h1>Criar Local</h1>
      </div>
      <div className={styles.container_add}>
        <h2>Local</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.container_info}>
            <p>Nome</p>
            <div className={styles.container_text}>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome do local"
              />
            </div>
          </div>

          <div className={styles.container_info}>
            <p>Endereço</p>
            <div className={styles.container_text}>
              <input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Endereço do local"
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
                placeholder="Capacidade do local"
              />
            </div>
          </div>

          <div className={styles.container_descricao}>
            <p>Descrição</p>
            <div className={styles.container_text}>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição do local"
              />
            </div>
          </div>

          <div className={styles.button_container}>
            <button type="submit" className={styles.button}>Salvar</button>
            <Link href="/dashboard/locais/" passHref>
              <button type="button" className={styles.button}>Voltar</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
