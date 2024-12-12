"use client";

import React, { useState } from "react";
import InputField from "../../components/inputField";
import styles from "./login.module.css";

export default function Login() {
    const [password, setPassword] = useState<string>(""); 
    const [email, setEmail] = useState<string>(""); 

    return (
        <div className={styles.container}>
            <div className={styles.container_title}> 
                <h2> Acesse sua conta! </h2>  
            </div>

            <div className={styles.container_info}> 
                <InputField
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email ou nome de usuário"
                    isFilled={email !== ""}
                />
                <InputField
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Senha"
                    isFilled={password !== ""}
                />

                <label>
                    <input type="checkbox" />
                    Mantenha-me conectado
                </label>

                <div className={styles.container_button}> 
                    <button className={styles.button}>
                        Entrar
                    </button>
                </div>

                <div className={styles.container_button}> 
                    Esqueceu sua senha? Clique aqui
                </div>
            </div>

            <div className={styles.container_footer}> 
                <p> Não possui uma conta? <a href="#">Cadastre-se</a> </p>
            </div>
        </div>
    );
}
