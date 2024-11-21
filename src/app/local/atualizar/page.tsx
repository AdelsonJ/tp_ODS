"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import styles from "./atualizar.module.css";
import Link from "next/link";

export default function LocalCadastro() {
    // Estados para armazenar os dados do formulário
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [capacity, setCapacidade] = useState("");
    const [description, setDescricao] = useState("");
    const [localList, setLocalList] = useState<any[]>([]); // Lista de locais disponíveis
    const [selectedId, setSelectedId] = useState<number | null>(null); // ID do local selecionado

    // Inicializa o useRouter
    const router = useRouter();

    // Função para carregar os locais no combo box (select)
    useEffect(() => {
        async function fetchLocais() {
        try {
            const response = await fetch('http://localhost:5001/local');
            if (!response.ok) {
            throw new Error('Erro ao carregar os locais');
            }
            const locais = await response.json();
            setLocalList(locais); // Preenche a lista de locais
        } catch (error) {
            console.error('Erro ao carregar locais:', error);
        }
        }

        fetchLocais();
    }, []);

    // Função para preencher os campos com base no local selecionado
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        setSelectedId(selectedId);

        const selectedLocal = localList.find(local => local.id === selectedId);
        if (selectedLocal) {
        // Preenche o nome com o nome do local selecionado
        setNome(selectedLocal.name);
        setEndereco(selectedLocal.address);
        setCapacidade(selectedLocal.capacity.toString());
        setDescricao(selectedLocal.description);
        }
    };

    // Função para excluir o local antigo
    const deleteOldLocal = async (id_excluir: number) => {
        if (id_excluir) {
        try {
            const response = await fetch(`http://localhost:5001/deleteLocal`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: [id_excluir] })
            });

            if (!response.ok) {
            throw new Error("Erro ao excluir o local antigo");
            }

            const responseData = await response.json();
            alert(responseData.message);
        } catch (error) {
            alert(`Erro ao excluir local antigo: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        }
        }
    };

    // Função para lidar com o envio do formulário (atualização do local)
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (selectedId === null) {
        alert("Selecione um local para atualizar");
        return;
        }

        const oldLocal = localList.find(local => local.id === selectedId);
        if (!oldLocal) {
        alert("Local não encontrado");
        return;
        }

        const novoLocal = {
        id: oldLocal.id, // Usar o ID do local antigo para atualizar
        name: nome || oldLocal.name, // Deixa o nome vazio para edição
        address: endereco,
        capacity: Number(capacity),
        description: description,
        };

        try {
        // Primeiro, exclui o local antigo
        await deleteOldLocal(oldLocal.id);

        // Depois, envia o novo local para ser salvo
        const response = await fetch('http://localhost:5001/saveLocal', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoLocal),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro desconhecido');
        }

        const responseData = await response.json();
        alert(responseData.message);

        // Redireciona para a página de locais após o sucesso
        router.push('/local');  // Redireciona para a página principal de locais
        } catch (error: any) {
        console.error('Erro ao atualizar o local:', error);
        alert(`Erro ao atualizar o local: ${error.message}`);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.container_title}>
                <h1>Atualizar Local</h1>
            </div>
            <div className={styles.container_add}>
                <h2>Local</h2>

            <form>
                <div className={styles.container_info}>
                    <p>ID</p>
                    <div className={styles.container_text}>
                    <select value={selectedId ?? ""} onChange={handleSelectChange}>
                        <option value="">Selecione um local</option>
                        {localList.map((local) => (
                        <option key={local.id} value={local.id}>
                            {local.id}
                        </option>
                        ))}
                    </select>
                    </div>
                </div>

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
                        value={capacity}
                        onChange={(e) => setCapacidade(e.target.value)}
                        placeholder="Capacidade do local"
                    />
                    </div>
                </div>

                <div className={styles.container_description}>
                    <p>Descrição</p>
                    <div className={styles.container_text}>
                    <textarea
                        value={description}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descrição do local"
                    />
                    </div>
                </div>
                </form>
            </div>


            <div className={styles.button_container}>
                <button onClick={handleSubmit} className={styles.button}>Salvar</button>

                <Link href="/local" passHref>
                    <button className={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );
}
