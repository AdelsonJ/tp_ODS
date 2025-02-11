'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { Carousel } from "./components/ImageCarousel";
import CategoriesSection from "./components/CategoriesSection";
import CategoriesCarousel from "./components/CategoriesCarousel";
import EmblaCarousel  from "./components/EmblaCarousel";
import EmblaCarouselDate from "./components/EmblaCarouselDate";
import EmblaCarouselNovidade  from "./components/EmblaCarouselNovidade";
import EmblaCarouselDestaque from "./components/EmblaCarouselDestaque";
import Link from "next/link";
import { useUser } from "./components/UserContext"; 
import LoginModal from "./entidades/login/loginModal";
import CadastroModal from "./entidades/cadastro/cadastroModal";

import '@/app/page-module.css'


export default function Home() {

	const { user, setUser } = useUser()
	const [isLoginOpen, setLoginOpen] = useState(false);
	const [isCadastroOpen, setCadastroOpen] = useState(false);

	const OPTIONS = { align: 'start' }
	const SLIDE_COUNT = 7
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

	return (
		<>			
			<Carousel />
			
			<CategoriesCarousel title="Categorias" options={{ loop: true }} />

			<EmblaCarouselDestaque slides={SLIDES} options={OPTIONS} title="Eventos em destaque"/>
			<EmblaCarouselNovidade slides={SLIDES} options={OPTIONS} title="Novidades"/>
			<EmblaCarouselDate slides={SLIDES} options={OPTIONS} title="Eventos próximos"/>

			<div className="container">
				<div className="create-event-section">
				{user ? (
					<div className="text-section">
						<h3>Que tal criar seu próprio evento?</h3>
						<h4>Chegou a sua vez!</h4>
						<p>Crie seu evento de forma rápida e simples agora mesmo.</p>
						<Link href="/entidades/evento/cadastro" passHref>
							<button className="event-button">Criar Evento</button>
						</Link>
					</div>
				) : (
					<div className="text-section">
						<h3>Que tal criar seu próprio evento?</h3>
						<h4>Chegou a sua vez!</h4>
						<p>Entre ou cadastre-se para criar seu evento de forma rápida e simples agora mesmo.</p>
						<div>
							<button className="event-button" onClick={() => setLoginOpen(true)}>Login</button>
							<LoginModal 
								isOpen={isLoginOpen} 
								onClose={() => setLoginOpen(false)} 
								setCadastroOpen={setCadastroOpen} 
							/>
							<br/>
							<br/>
							<button className="event-button" onClick={() => setCadastroOpen(true)}>Cadastre-se</button>
							<CadastroModal 
								isOpen={isCadastroOpen} 
								onClose={() => setCadastroOpen(false)} 
								setLoginOpen={setLoginOpen}
							/>
						</div>
					</div>
				)}

					<Image 
						src="/schedule.svg"
						width={500}
						height={300}
						alt="Ilustração de um calendário"
					/>
				</div>
			</div>

		</>
	);
}
