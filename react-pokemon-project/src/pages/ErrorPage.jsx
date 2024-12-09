import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <section className="p-3">
        <h1 className="p-3">Error</h1>
        <Link to="/" className="border rounded-md px-4 py-2 mt-6">HOME</Link>
    </section>
  )
}
