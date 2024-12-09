import { useState } from "react"

function DetailsWrapper(DetailsComponent) {
    function NewComponent(props){
        // Aqui estará la logica comun
        const [likes, setLikes] = useState(0)


        const increaseLikes= () => {
            setLikes(likes + 1)
        }
        
        return (
            // retornamos el componente que llegue por parametro

            <DetailsComponent
                pokemon={props.pokemon}
                likes={likes}
                increaseLikes={increaseLikes}
            />
        )
        
    }
    
    return NewComponent

}
export default DetailsWrapper