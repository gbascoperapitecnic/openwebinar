import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <section id="home-page" className="min-h-screen flex justify-center flex-col items-center gap-4">
            <h1 className="text-2xl">Bienvenido!</h1>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn74k9jrdLZiWw0dCfb06gfj7SzsJbSBR0cQ&s" alt="" />
            <Link className="bg-orange-500 rounded-md px-5 py-2 font-semibold" to="/pokemons">Entrar</Link>
        </section>
    )
}
