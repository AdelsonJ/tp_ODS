"use client";

import styles from "./atualizar.module.css";
import DataTable from "./tabela";
import AtualizarForm from "./atualizar"; 
import { useSearchParams } from "next/navigation";

export default function LocalAtualizar() {
    const searchParams = useSearchParams();
    const view = searchParams.get("view");

    return (
        <div className={styles.container}>
            {view === "atualizar" ? <AtualizarForm /> : <DataTable />}
        </div>
    );
}
