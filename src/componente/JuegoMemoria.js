
import PantallaInicial from './JuegoDeMemoria/PantallaInicial';
import Juego from './JuegoDeMemoria/Juego';
import Win from './JuegoDeMemoria/Win';
import { useState } from 'react';


export default function JuegoMemoria(){
     // variables de estado
     const[level, setLevel]= useState(0)
     const [estadoJuego, setEstadoJuego] = useState(0)
        // cambio de dificultad
     const cambioLevel = () => {
        setLevel(level === 2 ? 0 : level + 1)
     }
     // determinar el estado del juego
     const cambioEstadoJuego = (value) =>{
        setEstadoJuego(value)

     }


    return(
        <div>
            { estadoJuego ===0 ?
            <PantallaInicial 
            level = {level} 
            cambioLevel={cambioLevel} 
            setStart = {cambioEstadoJuego}
            /> : <Juego/>
        }  
        <Win/>
        </div>
    );
}