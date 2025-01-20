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
        <div className={styles.button_container}>
            <Link href="/entidades/evento/cadastro" passHref>
                <button className={styles.button}>Cadastrar</button>
            </Link>
            <Link href="/entidades/evento/atualizar" passHref>
            <button className={styles.button}>Atualizar</button>
            </Link>
            <Link href="/entidades/evento/excluir" passHref>
            <button className={styles.button}>Excluir</button>
            </Link>
        </div>
        </>
    );
}
