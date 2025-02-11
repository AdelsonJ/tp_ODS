'use client'

import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import '@/app/components/styles/EmblaStyle.css';

const CategoriesCarousel = ({ title }) => {
  const options = { 
    loop: true, 
    align: "start", 
    slidesToScroll: 1, 
    containScroll: "trim",
    dragFree: true 
  };
  
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias
  const router = useRouter(); // Hook para navegação

  // Buscar categorias da API
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('/api/categoria'); // Rota GET configurada
        if (!response.ok) {
          throw new Error('Erro ao buscar categorias');
        }
        const data = await response.json();
        setCategorias(data); // Atualiza o estado com as categorias
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
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

        <div className="embla__viewport_cateoria" ref={emblaRef}>
          <div className="embla__container_categoria">
            {categorias.length === 0 ? (
              <p>Carregando categorias...</p> // Exibe uma mensagem enquanto as categorias são carregadas
            ) : (
              categorias.map((categoria) => (
                <div className="embla__slide_categoria embla__slide_categoria--multi" key={categoria.id}>
                  <Image
                    src={categoria.imagem || '/placeholder.png'} // Usa o campo "imagem" ou um placeholder
                    width={120}
                    height={120}
                    alt={categoria.nome || 'Categoria'}
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push(`/entidades/evento?categoria=${categoria.id}`)}
                  />
                  <p>{categoria.nome}</p> {/* Nome da categoria */}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesCarousel;
