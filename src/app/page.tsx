import Image from "next/image";
import { Carousel } from "./components/ImageCarousel";
import CategoriesSection from "./components/CategoriesSection";
import EmblaCarousel  from "./components/EmblaCarousel";

import '@/app/page-module.css'


export default function Home() {
	
	const OPTIONS = { align: 'start' }
	const SLIDE_COUNT = 7
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

	return (
		<>			
			<Carousel />
			
			<CategoriesSection />

			<EmblaCarousel slides={SLIDES} options={OPTIONS} title="Eventos em destaque"/>
			<EmblaCarousel slides={SLIDES} options={OPTIONS} title="Novidades"/>
			<EmblaCarousel slides={SLIDES} options={OPTIONS} title="Eventos próximos"/>

			<div className="container">
				<div className="create-event-section">
					<div className="text-section">
						<h3>Que tal criar seu próprio evento?</h3>
						<h4>Chegou a sua vez!</h4>
						<p>Crie seu evento de forma rápida e simples agora mesmo.</p>
						<button className="event-button">Criar Evento</button>
					</div>

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
