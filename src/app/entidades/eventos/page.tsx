import Link from "next/link";
import Image from "next/image";
import NavBar from "../components/Header";
import styles from "@/app/eventos/eventos.module.css"

export default function Eventos() {
    return (
        <>
            <NavBar />
            <div className="container">
                <div className={styles.eventGrid}>
                    <div className={styles.boxEvent}></div>
                    <div className={styles.boxEvent}></div>
                    <div className={styles.boxEvent}></div>
                    <div className={styles.boxEvent}></div>
                    <div className={styles.boxEvent}></div>
                    <div className={styles.boxEvent}></div>
                    <div className={styles.boxEvent}></div>
                    <div className={styles.boxEvent}></div>
                    <div className={styles.boxEvent}></div>
                    <div className={styles.boxEvent}></div>
                </div>
            </div>
        </>
    )
}