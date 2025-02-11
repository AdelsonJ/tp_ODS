"use client";
import Link from "next/link";
import DataTable from "./tabela"; 
import styles from "./local.module.css"; 
import { useUser } from "../../components/UserContext";

export default function Local() {

    const { user, setUser } = useUser();

    return (
        <>
        <div className={styles.container}>
            <DataTable />
        </div>
        {user ? (
            <div className={styles.button_container}>
                <Link href="/entidades/local/cadastro" passHref>
                    <button className={styles.button}>Cadastrar</button>
                </Link>
                <Link href="/entidades/local/atualizar" passHref>
                <button className={styles.button}>Atualizar</button>
                </Link>
                <Link href="/entidades/local/excluir" passHref>
                <button className={styles.button}>Excluir</button>
                </Link>
            </div>
        ) : (
            <div className={styles.button_container}>
            </div>
        )}
        </>
    );
}
