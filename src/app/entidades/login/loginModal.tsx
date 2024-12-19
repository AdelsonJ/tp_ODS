"use client";

import React, { useState } from "react";
import InputField from "../../components/inputField";
import Modal from "./login";
import styles from "./log.module.css";
import { signIn, getSession } from 'next-auth/react';
import { useUser } from '../../components/UserContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCadastroOpen: (value: boolean) => void;
}

export default function LoginModal({ isOpen, onClose, setCadastroOpen }: LoginModalProps) {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      const session = await getSession();
      if (session?.user) {
        setUser(session.user);
        handleClose();
      }
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.modalOverlay)) {
      handleClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className={`${styles.modalOverlay} ${isOpen ? styles.active : ""}`}
          onClick={handleOutsideClick}
        >
          <div className={styles.container}>
            <div className={styles.modalContent}>
              <button className={styles.close_button} onClick={handleClose}>
                <h3>X</h3>
              </button>
              <div className={styles.container_title}>
                <h2>Acesse sua conta!</h2>
              </div>
            </div>

            <form className={styles.container_info} onSubmit={handleLogin}>
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
              
              <label className={styles.checkbox}>
                <input type="checkbox" />
                Mantenha-me conectado
              </label>
              <div className={styles.container_button}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button className={styles.button} type="submit">
                  Entrar
                </button>
              </div>
              <div className={styles.container_button}>
                Esqueceu sua senha? Clique aqui
              </div>
            </form>

            <div className={styles.container_footer}>
              <p>
                Não possui uma conta?
                <button
                  onClick={() => {
                    handleClose();
                    setCadastroOpen(true);
                  }}
                >
                  Cadastre-se
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
