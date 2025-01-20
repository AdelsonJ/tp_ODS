"use client";
import Link from "next/link";
import DataTable from "./tabela"; 
import styles from "../local.module.css"; 

export default function LocalExcluir() {

    return (
        <>
        <div className={styles.container}>
            <DataTable />
        </div>
        </>
    );
}
