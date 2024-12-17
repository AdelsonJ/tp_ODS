"use client";
import NavBar from "./components/Header";
import { UserProvider } from "./components/UserContext";

export default function Template({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <UserProvider>
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
        </UserProvider>
    );
}