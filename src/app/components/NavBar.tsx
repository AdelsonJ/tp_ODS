import Image from "next/image"

export default function NavBar() {
    return (
        <header>
            <nav>
                <div className="search-bar">
                    <input type="text" placeholder="e" />
                </div>

                <div className="logo-img">
                    <Image 
                        src="/logo.webp"
                        width={50}
                        height={50}
                        alt="Logo do site"
                    />
                </div>
                <button>Login</button>
                <button>Cadastrar</button>
            </nav>
        </header>
    )
}