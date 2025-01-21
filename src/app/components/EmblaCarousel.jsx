'use client'

import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import '@/app/components/styles/EmblaStyle.css';

const EmblaCarousel = (props) => {
  const { options, title } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  const [eventos, setEventos] = useState([]); // Estado para armazenar os eventos

  const router = useRouter(); // Hook para navegação

  // Buscar eventos da API
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('/api/evento'); // Rota GET configurada
        if (!response.ok) {
          throw new Error('Erro ao buscar eventos');
        }
        const data = await response.json();
        setEventos(data); // Atualiza o estado com os eventos
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  return (
    <div className='container'>
      <section className="embla">
        <div className="embla__controls">
          <h2 className="section-title">{title}</h2>

          <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>

        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {eventos.length === 0 ? (
              <p>Carregando eventos...</p> // Exibe uma mensagem enquanto os eventos são carregados
            ) : (
              eventos.map((evento) => (
                <div className="embla__slide" key={evento.id}>
                  <Image
                    src={evento.imagem || '/placeholder.png'} // Usa o campo "imagem" ou um placeholder
                    width={300}
                    height={200}
                    alt={evento.nome || 'Evento'}
                    style={{ cursor: "pointer" }}
					onClick={() => router.push(`/entidades/evento/pagina?id=${evento.id}`)}
                  />
                  <p>{evento.nome}</p> {/* Nome do evento */}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmblaCarousel;
