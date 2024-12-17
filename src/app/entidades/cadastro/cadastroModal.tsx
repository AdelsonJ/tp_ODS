"use client";
import styles from "./cadastro.module.css"; 
import InputField from "../../components/inputField";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./cadastro"; 

interface CadastroModalProps {
    isOpen: boolean;
    onClose: () => void;
    setLoginOpen: (value: boolean) => void;  // A prop setLoginOpen é passada do NavBar
}

export default function CadastroModal({ isOpen, onClose, setLoginOpen }: CadastroModalProps) {
    const [nome, setName] = useState<string>(""); 
    const [data_nasc, setDate] = useState<string>(""); 
    const [email, setEmail] = useState<string>(""); 
    const [username, setUsernome] = useState<string>(""); 
    const [senha, setPassword] = useState<string>(""); 

    const router = useRouter();

    const handleClose = () => {
        setEmail("");
        setPassword("");
        setName("");
        setDate("");
        setUsernome("");
        onClose(); 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Impede o comportamento padrão do formulário

        const novoUsuario = {
            nome,
            data_nasc,
            email,
            username,
            senha
        };

        try {
            const response = await fetch('/api/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoUsuario),
            });

            if (!response.ok) {
                const errorData = await response.text();  // Pega a resposta como texto
                throw new Error(errorData || 'Erro desconhecido');
            }

            const responseData = await response.json();  // Tenta converter para JSON se a resposta for válida
            alert(responseData.message);

            onClose(); 
            setLoginOpen(true);
        } catch (error: any) {
            console.error('Erro ao salvar o usuário:', error);
            alert(`Erro ao salvar o usuário: ${error.message}`);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className={styles.container}>
                <div className={styles.container_title}> 
                    <h2>Cadastro de Usuário</h2>  
                </div>

                <form onSubmit={handleSubmit} className={styles.container_info}> 
                    {/* Adicionando o formulário */}
                        <InputField
                            type="text"
                            value={nome}
                            onChange={(e) => setName(e.target.value)}
                            label="Nome completo"
                            isFilled={nome !== ""}
                        />

                        <InputField
                            type="date" 
                            value={data_nasc}
                            onChange={(e) => setDate(e.target.value)}
                            label="Data de Nascimento"
                            isFilled={data_nasc !== ""}
                        />

                        <InputField
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            isFilled={email !== ""}
                        />

                        <InputField
                            type="text"
                            value={username}
                            onChange={(e) => setUsernome(e.target.value)}
                            label="Nome de usuário"
                            isFilled={username !== ""}
                        />

                        <InputField
                            type="password"
                            value={senha}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Senha"
                            isFilled={senha !== ""}
                        />

                        <div className={styles.container_button}> 
                            <button type="submit" className={styles.button}>Cadastrar</button>
                        </div>
                    </form>

                <div className={styles.container_footer}> 
                    <p>Já possui uma conta? 
                        <button onClick={() => {
                            handleClose();
                            setLoginOpen(true); 
                        }}>
                            Faça Login
                        </button>
                    </p>
                </div>
            </div>
        </Modal>
    );
}
