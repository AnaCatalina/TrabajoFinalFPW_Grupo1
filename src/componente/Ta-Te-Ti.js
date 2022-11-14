import { useState } from "react";
import Tablero from "../componente/Ta-Te-ti/Tablero";
import '../componente/Ta-Te-ti/style/Game.css';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import sonido1 from '../sounds/sonido1.mp3';
import Puntaje from "./Ta-Te-ti/Puntaje";



    // agregamos sonido a cada click de los botones
  function play(){
      new Audio(sonido1).play();
  }
// instacionamos un array que van a ser de las lineas posibles para ganar
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

// en la funcion instanciamos que valores que nos va a devolver mediante el uso de los hooks
  const Game = () =>{
    const [turno, setTurno] = useState("X") // instanciamos el valor o el signo que comenzara el juego, en este caso el X
    const[lineaGanadora,setLineaGanadora] = useState([])  // asignamos una variable que nos va a devolver un array, en este caso de las lineas ganadoras
    const[cuadrados, setCuadrados] = useState(Array(9).fill(null)) // instanciamos un elemento cuadrado al cual le mandaremos un array de 9 elemento y que seran vacios
    const[punto, setPunto]=useState({ // instanciamos los valores puntos que inicializan en 0
      X:0,
      O:0,
    });
    const resetear = ()=>{ // funcion encargafa de resetear el juego una vez que algun jugador logre ganar
      setTurno("X"); // inicia el turno para las X
      setCuadrados(Array(9).fill(null)); // los cuadrados vuelven a nulos
      setLineaGanadora([]); // se reinician el array de las lineas haciendo desaparecer las X y O
    }
    const checkWin = newCuadrado =>{ // funcion se encargada de analizar quien gano y mostrar las animaciones del tablero
      for(let i = 0; i < combinacionGanadora.length; i++){
        const[a,b,c] = combinacionGanadora[i];
        if(newCuadrado[a] && newCuadrado[a] === newCuadrado[b] && newCuadrado[a] === newCuadrado[c]){ // condicion para analizar si los cuadros seleccionados coinciden con el mismo signo
        //hay ganador
        finJuego(newCuadrado[a],combinacionGanadora[i]); // le pasamos el valor gandor 
        console.log('gano');
        return // retornamos para que la funcion analice de nuevo el proximo movimiento
        }
      }
      if(!newCuadrado.includes(null)){ // si ninguno coincide 3 veces se genera un empate
        // hay empate
        finJuego(null, Array.from(Array(10).keys())); // creamos un array de 10 enlementos para animar el tablero
        return
      }
      setTurno(turno === 'X' ? 'O' : 'X');
    }

    const clikear = cuadrado => { // metodo usado para no dejar clikear otros cuadrados una vez que encuentre un gandor
      let newCuadrado = [...cuadrados]; // desestructuramos los cuadrados 
      newCuadrado.splice(cuadrado, 1 , turno);
      setCuadrados(newCuadrado);
      checkWin(newCuadrado);

    }
    const finJuego = (resultado, combinacionGanadora) =>{ // metodo utilizado para sumarle un punto a cada jugaodr
      
      setTurno(null);
      if(resultado !== null){
        setPunto({
          ...punto, // desestructuramos el valor de puntos para poder sumarlos
          [resultado]:punto[resultado] + 1,
        })
      }
      setLineaGanadora(combinacionGanadora);
      setTimeout(() => {
        resetear();
      }, 3000); // con esto se resetea automaticamente los signos al cabo de 3 segundos
      
    }
    return (
       
         
        <div className="container">
        <Puntaje puntajeO={punto.O} puntajeX ={punto.X}/>
          <Tablero lineaGanadora={lineaGanadora} turno = {turno} cuadrados={cuadrados} onClick = {clikear}/>
          <Button variant="warning" >
            <Link to='/' className="btn btn-principal" onClick={play}>Volver</Link>
          </Button>
        </div>
        
      );
  
  }

export default Game;