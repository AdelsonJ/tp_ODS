'use client'

import Image from "next/image";
import eventsData from "../assets/data/eventsData";
import React from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import '@/app/components/styles/EmblaStyle.css'

const EmblaCarousel = (props) => {
	const { slides, options, title } = props
	const [emblaRef, emblaApi] = useEmblaCarousel(options)

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
	useDotButton(emblaApi)

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick
	} = usePrevNextButtons(emblaApi)

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

					{eventsData.map((event, index) => (
						<div className="embla__slide" key={index}>
							<Image
								src={event.src}
								width={300}
								height={200}
								alt={event.alt}
							/>
						</div>
					))}

					
				</div>
			</div>

		</section>
	</div>
   
    
  )
}

export default EmblaCarousel
