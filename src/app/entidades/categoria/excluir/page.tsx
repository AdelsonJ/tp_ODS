"use client";
import Link from "next/link";
import DataTable from "./tabela"; 
import styles from "../categoria.module.css"; 

export default function categoriaExcluir() {

    return (
        <>
        <div className={styles.container}>
            <DataTable />
        </div>
        </>
    );
}
