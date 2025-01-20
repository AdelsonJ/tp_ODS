"use client";

import React, { ReactNode } from "react";
import styles from "./log.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode; 
}

export default function Login({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null; 

    return (
        <div className={styles.modalOverlay}>{children}</div>
    );
}
