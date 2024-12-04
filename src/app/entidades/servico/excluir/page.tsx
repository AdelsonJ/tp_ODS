"use client";
import Link from "next/link";
import DataTable from "./tabela"; 
import styles from "../servico.module.css"; 
import NavBar from "../../../components/Header";

export default function servicoExcluir() {

    return (
        <>
        <NavBar/>
        <div className={styles.container}>
            <DataTable />
        </div>
        </>
    );
}
