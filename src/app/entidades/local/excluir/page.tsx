"use client";
import Link from "next/link";
import DataTable from "./tabela"; 
import styles from "../local.module.css"; 
import NavBar from "../../../components/Header";

export default function LocalExcluir() {

    return (
        <>
        <NavBar/>
        <div className={styles.container}>
            <DataTable />
        </div>
        </>
    );
}
