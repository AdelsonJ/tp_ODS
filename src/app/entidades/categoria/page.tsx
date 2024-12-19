"use client";
import Link from "next/link";
import DataTable from "./tabela"; 
import styles from "./categoria.module.css"; 
import NavBar from "../../components/Header";

export default function Servico() {

  return (
    <>
      <div className={styles.container}>
        <DataTable />
      </div>
      <div className={styles.button_container}>
        <Link href="/entidades/categoria/cadastro" passHref>
            <button className={styles.button}>Cadastrar</button>
        </Link>
        <Link href="/entidades/categoria/atualizar" passHref>
          <button className={styles.button}>Atualizar</button>
        </Link>
        <Link href="/entidades/categoria/excluir" passHref>
          <button className={styles.button}>Excluir</button>
        </Link>
      </div>
    </>
  );
}