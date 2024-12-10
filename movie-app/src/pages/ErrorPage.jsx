import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center flex-col gap-4 justify-center">
        <h1 className="text-3xl text-white">Error, parece que esta página no existe.</h1>
        <Link to={"/page/1"} className="bg-white rounded px-5 py-2 text-black">Volver a la Lista</Link>
    </div>
  )
}
