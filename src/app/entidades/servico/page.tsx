"use client";
import Link from "next/link";
import DataTable from "./tabela"; 
import styles from "./servico.module.css"; 
import NavBar from "../../components/Header";

export default function Servico() {

  return (
    <>
      <div className={styles.container}>
        <DataTable />
      </div>
      <div className={styles.button_container}>
        <Link href="/entidades/servico/cadastro" passHref>
            <button className={styles.button}>Cadastrar</button>
        </Link>
        <Link href="/entidades/servico/atualizar" passHref>
          <button className={styles.button}>Atualizar</button>
        </Link>
        <Link href="/entidades/servico/excluir" passHref>
          <button className={styles.button}>Excluir</button>
        </Link>
      </div>
    </>
  );
}
