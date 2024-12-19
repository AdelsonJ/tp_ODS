'use client';

import {
  CalendarDaysIcon,
  HomeIcon,
  TagIcon,
  UserCircleIcon,
  MapPinIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './nav-links.css';
import { useUser } from "../../components/UserContext";
import React, { useState, useEffect } from "react";

export default function NavLinks() {
  const { user, setUser } = useUser();
  const [tipo, setTipo] = useState(user?.tipo || "");

  useEffect(() => {
    if (user) {
        setTipo(user.tipo || "");
    }
  }, [user]);

  // Aqui você pode definir uma lógica real para determinar se o usuário é admin
  const isAdmin = tipo == "admin";  // Modifique com a lógica real para verificar o tipo de usuário

  // Map of links to display in the side navigation.
  const links = [
    // { name: 'Início', href: '/', icon: HomeIcon },
    { name: 'Perfil', href: '/dashboard/perfil', icon: UserCircleIcon },
    { name: 'Meus Eventos', href: '/dashboard/eventos', icon: CalendarDaysIcon },
    
    // Esses links só aparecerão se o usuário for admin
    ...(isAdmin ? [
      { name: 'Locais', href: '/dashboard/locais', icon: MapPinIcon },
      { name: 'Serviços', href: '/dashboard/servicos', icon: ClipboardDocumentListIcon },
      { name: 'Categorias', href: '/dashboard/categorias', icon: TagIcon },
    ] : []),
  ];

  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`navlink ${pathname === link.href ? 'navlink-active' : ''} navlink-md`}
          >
            <LinkIcon className="navlink-icon" />
            <p className="navlink-text-md navlink-text-md-show">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
