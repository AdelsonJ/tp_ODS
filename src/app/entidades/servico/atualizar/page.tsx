"use client";

import styles from "./atualizar.module.css";
import DataTable from "./tabela";
import AtualizarForm from "./atualizar"; 
import { useSearchParams } from "next/navigation";
import NavBar from "../../../components/Header";

export default function ServicoAtualizar() {
    const searchParams = useSearchParams();
    const view = searchParams.get("view");

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                {view === "atualizar" ? <AtualizarForm /> : <DataTable />}
            </div>
        </>
    );
}
