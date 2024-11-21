"use client";
import Link from "next/link";
import DataTable from "./tabela"; 
import styles from "./local.module.css"; 
import NavBar from "../components/Header";

export default function Local() {

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <DataTable />
      </div>
      <div className={styles.button_container}>
        <Link href="/local/cadastro" passHref>
            <button className={styles.button}>Cadastrar</button>
        </Link>
        <Link href="/local/atualizar" passHref>
          <button className={styles.button}>Atualizar</button>
        </Link>
        <Link href="/local/excluir" passHref>
          <button className={styles.button}>Excluir</button>
        </Link>
      </div>
    </>
  );
}
