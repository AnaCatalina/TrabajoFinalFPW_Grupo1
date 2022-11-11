import { useState } from "react";
import Tablero from "../componente/Ta-Te-ti/Tablero";
import '../componente/Ta-Te-ti/style/Game.css';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const combinacionGanadora = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

  const Game = () =>{
    const [turno, setTurno] = useState("X")
    const[lineaGanadora,setLineaGanadora] = useState([])
    const[cuadrados, setCuadrados] = useState(Array(9).fill(null))
    const[punto, setPunto]=useState({
      X:0,
      O:0,
    });
    const resetear = ()=>{
      setTurno("X");
      setCuadrados(Array(9).fill(null));
      setLineaGanadora([]);
    }
    const checkWin = newCuadrado =>{
      for(let i = 0; i < combinacionGanadora.length; i++){
        const[a,b,c] = combinacionGanadora[i];
        if(newCuadrado[a] && newCuadrado[a] === newCuadrado[b] && newCuadrado[a] === newCuadrado[c]){
        //hay ganador
        finJuego(newCuadrado[a],combinacionGanadora[i]);
        console.log('gano');
        return
        }
      }
      if(!newCuadrado.includes(null)){
        // hay empate
        finJuego(null, Array.from(Array(10).keys()));
        return
      }
      setTurno(turno === 'X' ? 'O' : 'X');
    }

    const clikear = cuadrado => {
      let newCuadrado = [...cuadrados];
      newCuadrado.splice(cuadrado, 1 , turno);
      setCuadrados(newCuadrado);
      checkWin(newCuadrado);

    }
    const finJuego = (resultado, combinacionGanadora) =>{
      
      setTurno(null);
      if(resultado !== null){
        setPunto({
          ...punto,
          [resultado]:punto[resultado] + 1,
        })
      }
      setLineaGanadora(combinacionGanadora);
      setTimeout(() => {
        resetear();
      }, 3000);
      
    }
    return (
        <div className="container">
          
          <Tablero lineaGanadora={lineaGanadora} turno = {turno} cuadrados={cuadrados} onClick = {clikear}/>
          <Button variant="warning" >
        <Link to='/' className="btn btn-principal">Volver</Link>
             </Button>
        </div>
      
      );
  
  }

export default Game;