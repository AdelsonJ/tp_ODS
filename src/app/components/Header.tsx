// components/Header.tsx
'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { BiSolidDrink } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import "./styles/Header.css";
import LoginModal from "../entidades/login/loginModal";
import CadastroModal from "../entidades/cadastro/cadastroModal";
import { useUser } from "./UserContext"; 

export default function NavBar() {
    const { user, setUser } = useUser(); // Consumindo o contexto
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isCadastroOpen, setCadastroOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        setUser(null); // Limpa o usuário no contexto
        // Aqui você pode adicionar lógica para deslogar no servidor, se necessário
    };

    return (
        <>
        {/* Overlay para efeito blur */}
        <div className={`page-overlay ${menuOpen ? "active" : ""}`} onClick={toggleMenu}></div>

        <header className="main-page-header">
            <div className="hamburger-menu" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
            </div>

            {/* Menu lateral suspenso */}
            <div className={`side-menu ${menuOpen ? "open" : ""}`}>
            <button className="close-button" onClick={toggleMenu}>×</button>
            <Link href="/">
                <button>
                <IoMdHome className="menu-icon" />
                Início
                </button>
            </Link>
            <Link href="/entidades/local">
                <button>
                <IoLocationSharp className="menu-icon" />
                Locais
                </button>
            </Link>
            <Link href="/entidades/cadastro">
                <button>
                <FaCalendarAlt className="menu-icon" />
                Eventos
                </button>
            </Link>
            <Link href="/entidades/servico">
                <button>
                <BiSolidDrink className="menu-icon" />
                Serviços
                </button>
            </Link>
            </div>

            <div>
            <input type="text" placeholder="pesquisar eventos, locais ou serviços" className="search-bar" />
            </div>

            <div className="logo-img">
            <Image 
                src="/logo.webp"
                width={50}
                height={50}
                alt="Logo do site"
            />
            </div>

            <div className="search-bar-locals">
            <input type="text" placeholder="Qualquer lugar" />
            </div>

            <div className="container_buttons">
            {/* Verifique se o usuário está logado */}
            {user ? (
                <div className="container_buttons">
                    <button className="buttons">{user.nome}</button>     
                    <button className="buttons" onClick={handleLogout}>Sair</button>
                </div>
            ) : (
                <>
                <div>
                    <button className="buttons" onClick={() => setLoginOpen(true)}>Login</button>
                    <LoginModal 
                        isOpen={isLoginOpen} 
                        onClose={() => setLoginOpen(false)} 
                        setCadastroOpen={setCadastroOpen} 
                    />
                    </div>
                        <div>
                        <button className="buttons" onClick={() => setCadastroOpen(true)}>Cadastre-se</button>
                        <CadastroModal 
                        isOpen={isCadastroOpen} 
                        onClose={() => setCadastroOpen(false)} 
                        setLoginOpen={setLoginOpen}
                        />
                </div>
                </>
            )}
            </div>
        </header>
        </>
  );
}
