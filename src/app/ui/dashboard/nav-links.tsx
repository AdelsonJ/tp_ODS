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

// Map of links to display in the side navigation.
const links = [
  // { name: 'Início', href: '/', icon: HomeIcon },
  { name: 'Perfil', href: '/dashboard/perfil', icon: UserCircleIcon },
  { name: 'Meus Eventos', href: '/dashboard/eventos', icon: CalendarDaysIcon },
  { name: 'Locais', href: '/dashboard/locais', icon: MapPinIcon},
  { name: 'Serviços', href: '/dashboard/servicos', icon: ClipboardDocumentListIcon },
  { name: 'Categorias', href: '/dashboard/categorias', icon: TagIcon },
];

export default function NavLinks() {
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
