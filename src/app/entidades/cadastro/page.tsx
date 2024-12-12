"use client";
import styles from "./cadastro.module.css"; 
import InputField from "../../components/inputField";
import React, { useState } from "react";

export default function Login() {
    const [name, setName] = useState<string>(""); 
    const [date, setDate] = useState<string>(""); 
    const [email, setEmail] = useState<string>(""); 
    const [username, setUsername] = useState<string>(""); 
    const [password, setPassword] = useState<string>(""); 

    return (
        <>
        <div className={styles.container}>

            <div className={styles.container_title}> 
                <h2> Acesse sua conta! </h2>  
            </div>

            <div className={styles.container_info}> 
                <InputField
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="Nome completo"
                    isFilled={name !== ""}
                />

                <InputField
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    label="Data de Nascimento"
                    isFilled={date !== ""}
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
                    onChange={(e) => setUsername(e.target.value)}
                    label="Nome de usuário"
                    isFilled={username !== ""}
                />

                <InputField
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Senha"
                    isFilled={password !== ""}
                />


                <div className={styles.container_button}> 
                    <button className={styles.button}>
                        Cadastrar
                    </button>
                </div>

            </div>

            <div className={styles.container_footer}> 
                <p> Não possui uma conta? Faça login </p>
            </div>
        </div>
        </>
    );
}
