"use client";

import React, { ReactNode } from "react";
import styles from "./cadastro.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode; 
}

export default function Cadastro({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null; 

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.close_button} onClick={onClose}>
                    <h3>X</h3>
                </button>
                {children}
            </div>
        </div>
    );
}
