'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import carouselData from "@/app/assets/data/carouselData.ts";
import "./styles/ImageCarousel.css";

const data = carouselData;

export const Carousel = () => {
  const [slide, setSlide] = useState(0);

  // Avançar para o próximo slide
  const nextSlide = () => {
    setSlide((prevSlide) => (prevSlide === data.length - 1 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      {data.map((item, idx) => (
        <Image
          src={item.src}
          alt={item.alt}
          key={idx}
          width={1000}
          height={600}
          className={slide === idx ? "slide slide-visible" : "slide"}
        />
      ))}
      <span className="indicators">
        {data.map((_, idx) => (
          <button
            key={idx}
            className={
              slide === idx ? "indicator" : "indicator indicator-inactive"
            }
            onClick={() => setSlide(idx)}
          ></button>
        ))}
      </span>
    </div>
  );
};
