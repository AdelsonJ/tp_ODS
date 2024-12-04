"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import styles from "./atualizar.module.css";
import Link from "next/link";

export default function ServicoCadastro() {
    // Estados para armazenar os dados do formulário
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descricao, setDescricao] = useState("");
    const [servicoList, setServicoList] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // Inicializa o useRouter
    const router = useRouter();

    //Função para carregar os locais no combo box (select)
    useEffect(() => {
        async function fetchServicos() {
            try {
                const response = await fetch('http://localhost:5001/servico');
                if (!response.ok){
                    throw new Error('Erro ao carregar os serviços');
                }
                const servicos = await response.json();
                setServicoList(servicos);
            } catch (error) {
                console.error('Erro ao carregar servicos:', error)
            }
        }

        fetchServicos();
    }, []);

    // Função para preencher os campos com base no local selecionado
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        setSelectedId(selectedId);

        const selectedServico = servicoList.find(servico => servico.id === selectedId);
        if (selectedServico){
            setNome(selectedServico.name);
            setCategoria(selectedServico.category);
            setDescricao(selectedServico.description);
        }
    };

    // Função para exluir o servico antigo
    const deleteOldServico = async(id_excluir: number) => {
        if (id_excluir){
            try {
                const response = await fetch('http://localhost:5001/deleteServico', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ids: [id_excluir]})
                });

                if (!response.ok) {
                    throw new Error("Erro ao exluir servico antigo");
                }

                const responseData = await response.json();
                alert(responseData.message);
            } catch(error) {
                alert(`Erro ao excluir serviço antigo: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
            }
        }
    };

    //Função para lidar com o envio do formulário (atualização do local)
    const handleSubmit = async(e: { preventDefault: () => void}) => {
        e.preventDefault();

        if(selectedId === null){
            alert("Selecione um local para atualizar");
            return;
        }

        const oldServico = servicoList.find(servico => servico.id === selectedId);
        if(!oldServico){
            alert("Serviço não encontrado");
            return;
        }

        const novoServico = {
            id: oldServico.id,
            name: nome || oldServico.name,
            category: categoria,
            description: descricao,
        };

        try {
            // Primeiro exclui o serviço antigo
            await deleteOldServico(oldServico.id);

            // Envia o novo serviço para ser salvo
            const response = await fetch('http://localhost:5001/saveServico', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoServico)
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro desconhecido');
            }

            const responseData = await response.json();
            alert(responseData.message);

            // Redireciona para a página de serviços após o sucesso
            router.push('/servico');
        } catch (error: any) {
            console.error('Erro ao atualizar o servico: ', error);
            alert('Erro ao atualizar o servico: ${error.message}');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.container_title}>
                <h1>Atualizar Servico</h1>
            </div>
            <div className={styles.container_add}>
                <h2>Servico</h2>

            <form>
                <div className={styles.container_info}>
                    <p>ID</p>
                    <div className={styles.container_text}>
                    <select value={selectedId ?? ""} onChange={handleSelectChange}>
                        <option value="">Selecione um servico</option>
                        {servicoList.map((servico) => (
                        <option key={servico.id} value={servico.id}>
                            {servico.id}
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
                        placeholder="Nome do servico"
                    />
                    </div>
                </div>

                <div className={styles.container_info}>
                    <p>Categoria</p>
                    <div className={styles.container_text}>
                    <input
                        type="text"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        placeholder="Categoria do servico"
                    />
                    </div>
                </div>

                <div className={styles.container_description}>
                    <p>Descrição</p>
                    <div className={styles.container_text}>
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descrição do servico"
                    />
                    </div>
                </div>
                </form>
            </div>


            <div className={styles.button_container}>
                <button onClick={handleSubmit} className={styles.button}>Salvar</button>

                <Link href="/servico" passHref>
                    <button className={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );
}