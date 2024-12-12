"use client";
import Link from "next/link";
import DataTable from "./tabela"; 
import styles from "../servico.module.css"; 

export default function servicoExcluir() {

    return (
        <>
        <div className={styles.container}>
            <DataTable />
        </div>
        </>
    );
}
