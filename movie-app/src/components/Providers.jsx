
export default function Providers({providers}) {
  // Array de los pares key-value   
  const providersArr = Object.entries(providers)

  //función para cambiar los títulos que vienen de providers
  const changeTitle = (title) => {
    return title == "flatrate" ?  "Suscripción"
        : title == "buy" ? "Comprar"
        : title == "ads" ? "Con Anuncios"
        : title == "rent" ? "Alquilar"
        : title == "link" ? "Ver más"
        :title
  }

  return (
    <div className="rounded-lg p-2 bg-black/60 mt-3">
        {providersArr.map((provider) => 
            <div key={provider.link} className="p-1 rounded-md">
                <h3 className="text-xl opacity-75">{changeTitle(provider[0])}</h3>

                <div className="flex items-center gap-3 flex-wrap">
                    {
                        typeof provider[1] === "string" ? (
                            <a href={provider[1]} className="rounded-full bg-indigo-900 px-5 py-2 my-3" target="_blank">Info</a>
                        ) : (
                            provider[1].map((providerInfo) => 
                                <img src={`https://image.tmdb.org/t/p/original/${providerInfo.logo_path}`} alt="logo-provider" className="w-14 mt-4 rounded-lg"/>
                            )
                        )
                    }
                </div>
            </div>
        )}
    </div>
  )
}
