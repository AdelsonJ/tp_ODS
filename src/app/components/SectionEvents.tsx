import Image from "next/image";
import eventsData from "../assets/data/eventsData";
import "./styles/SectionEvents.css"

export default function SectionEvents({title = "Eventos"}) {
    return (
        <div className="container">

            <h2 className="section-title">{title}</h2>
            <div className="events-conteiner">
                {eventsData.map((event) => (
                    <div key={event.name}>
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
    )
}