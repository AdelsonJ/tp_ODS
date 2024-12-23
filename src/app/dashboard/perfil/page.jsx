"use client";

import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { useUser } from "../../components/UserContext";
import InputField from "../../components/inputField";

export default function ProfilePage() {
    const { user, setUser } = useUser();
    const [nome, setNome] = useState(user?.nome || "");
    const [email, setEmail] = useState(user?.email || "");
    const [dataNasc, setDataNasc] = useState(user?.dataNasc ? new Date(user.dataNasc).toISOString().split('T')[0] : "");

    const [username, setUsername] = useState(user?.username || "");

    useEffect(() => {
        if (user) {
            setNome(user.nome || "");
            setEmail(user.email || "");
            setDataNasc(user.dataNasc ? new Date(user.dataNasc).toISOString().split('T')[0] : "");
            setUsername(user.username || "");
        }
    }, [user]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.username) {
            alert("Username do usuário não encontrado.");
            return;
        }

        const updatedUser = {
            username: user.username,
            nome,
            email,
            dataNasc,
        };

        try {
            const response = await fetch("/api/usuario", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setUser(updatedData.user);
                alert("Dados atualizados com sucesso!");
            } else {
                const errorData = await response.text();
                throw new Error(errorData || "Erro desconhecido");
            }
        } catch (error) {
            console.error("Erro ao atualizar os dados:", error);
            alert(`Erro ao atualizar os dados: ${error.message}`);
        }
    };

    return (
        <div className={styles.profileContainer}>
            <h1>Perfil do Usuário</h1>
            <form className={styles.profileForm} onSubmit={handleSubmit}>
                <InputField
                    label="Nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    isFilled={nome !== ""}
                />
                <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isFilled={email !== ""}
                />
                <InputField
                    label="Data de Nascimento"
                    type="date"
                    value={dataNasc}
                    onChange={(e) => setDataNasc(e.target.value)}
                    isFilled={dataNasc !== ""}
                />
                <InputField
                    label="Nome de Usuário"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isFilled={username !== ""}
                />
                <button type="submit" className={styles.submitButton}>
                    Atualizar Dados
                </button>
            </form>
        </div>
    );
}
