"use client";
import Link from "next/link";
import DataTable from "./tabela"; 
import styles from "./evento.module.css"; 

export default function Local() {

    return (
        <>
        <div className={styles.container}>
            <DataTable />
        </div>
        </>
    );
}
