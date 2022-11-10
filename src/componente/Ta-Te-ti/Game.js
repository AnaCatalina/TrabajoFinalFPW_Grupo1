import { useState } from "react";
import Tablero from "./componentes/Tablero";
import './style/Game.css';

  const Game = () =>{
    const [turno, setTurno] = useState("X")
    const[cuadrados, setCuadrados] = useState(Array(9).fill(null))
    const[punto, setPunto]=useState({
      X:0,
      O:0,
    });
    const checkWin = cuadrados =>{
      setTurno(turno === 'X' ? '0' : 'X');
    }

    const clikear = cuadrado =>{
      let newCuadrado = [...cuadrados];
      newCuadrado.splice(cuadrado, 1 , turno);
      setCuadrados(newCuadrado);
      checkWin(newCuadrado);

    }

    return (
        <div className="container">
          <Tablero turno = {turno} cuadrados={cuadrados} onClick = {clikear}/>
        </div>
    
      );
  
  }

export default Game;

