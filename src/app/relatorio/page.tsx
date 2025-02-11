"use client";
import DataTable2 from "./tabela_2"; 
import DataTable3 from "./tabela_3"; 
import styles from "./report.module.css"; 
import { useUser } from "../components/UserContext";

export default function Servico() {

  const { user, setUser } = useUser()

  return (
    <>
      <div className={styles.container}>
      <DataTable2     />
      <DataTable3     />
      </div>
    </>
  );
}