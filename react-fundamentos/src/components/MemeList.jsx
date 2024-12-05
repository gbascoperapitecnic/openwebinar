import { useEffect, useState } from "react"
import '../index.css'
import axios from "axios"

function MemeList() {
    
    const [memes, setMemes] = useState([])

    const HTMLMemes = memes.map((meme) => 
        <li key={meme.id} style={{maxWidth: "100%"}}>
            <h2>{meme.name}</h2>
            <img src={meme.url} alt="" width={meme.width} height={meme.height}/>
        </li>
    )

    // cuando se monte este componente hacer peticion a la api
    // useEffect(() =>{
    //     fetch("https://api.imgflip.com/get_memes")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // console.log(data.data.memes);
    //             setMemes(data.data.memes)
    //         })
    // }, [])
    
    // cuando se monte el componente, llamar a la api
    useEffect(()=> {
        axios.get("https://api.imgflip.com/get_memes").then((response) => {
            console.log(response.data)
            setMemes(response.data.data.memes)
        })
    }, [])
    console.log(memes)

    return (

    <ul className="meme-list">
        {HTMLMemes}
    </ul>
  )
}

export default MemeList