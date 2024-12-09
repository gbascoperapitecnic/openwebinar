import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <section className="p-3 min-h-screen flex flex-col justify-center items-center">
        <h1 className="p-3 text-4xl text-red-600">Error 404</h1>
        <Link to="/" className="border rounded-md px-4 py-2 mt-6">Ir a Home</Link>
    </section>
  )
}
