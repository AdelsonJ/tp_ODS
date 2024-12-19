import Link from "next/link";
import DataTable from "@/app/dashboard/locais/tabela"; 
import styles from "./local.module.css"; 

export default function Local() {

    return (
        <>
        <div className={styles.container}>
            <DataTable />
        </div>
        <div className={styles.button_container}>
            <Link href="/dashboard/locais/cadastro" passHref>
                <button className={styles.button}>Cadastrar</button>
            </Link>
            <Link href="/dashboard/locais/atualizar" passHref>
            <button className={styles.button}>Atualizar</button>
            </Link>
            <Link href="/dashboard/locais/excluir" passHref>
            <button className={styles.button}>Excluir</button>
            </Link>
        </div>
        </>
    );
}
