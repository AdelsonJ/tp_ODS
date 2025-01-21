"use client";
import EventoDetalhes from "./evento";
import styles from "../evento.module.css"; 
import { useSearchParams } from "next/navigation";

export default function EventoPagina() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    if (!id) {
        return <p>Evento não encontrado!</p>;
    }
    console.log(id)

    return (
        <div className={styles.container}>
            <EventoDetalhes id={id} /> {/* Passando o id como prop */}
        </div>
    );
}
