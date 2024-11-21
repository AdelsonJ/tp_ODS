import Image from "next/image"
import categoriesData from "../assets/data/categoriesData"
import "./styles/CategoriesSection.css"

export default function CategoriesSection() {
    return (
        <div className="container">
            <h2 className="section-title">Categorias</h2>
            <div className="categories-container">
                {categoriesData.map((categories) => (
                    <div className="category" key={categories.name}>
                        <Image
                            className="categoty-img"
                            src={categories.src}
                            width={120}
                            height={120}
                            alt={categories.alt}
                        />
                        <p className="category-label">
                            {categories.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}