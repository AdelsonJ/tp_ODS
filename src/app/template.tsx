"use client";
import Link from "next/link";
import NavBar from "./components/Header";
import styles from "./page.module.css";

export default function Template({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <main>
            <header>
                <NavBar />
            </header>

            <div>
                {children}
            </div>

            <footer>
            </footer>
        </main>
    );
}