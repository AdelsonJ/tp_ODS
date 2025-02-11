"use client";
import Link from "next/link";
import DataTable from "./tabela"; 
import styles from "./categoria.module.css"; 
import NavBar from "../../components/Header";
import { useUser } from "../../components/UserContext";

export default function Servico() {

  const { user, setUser } = useUser()

  return (
    <>
      <div className={styles.container}>
        <DataTable />
      </div>
      {user ? (
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
      ) : (
        <div className={styles.button_container}>
        </div>
      )}
    </>
  );
}