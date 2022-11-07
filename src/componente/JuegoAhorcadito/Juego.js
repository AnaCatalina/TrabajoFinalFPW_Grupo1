
import { useEffect } from "react";
import "../../styles/Ahorcadito.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import React from 'react';

let contador = 0;
//let acertar = false;
function Juego({ palabraArreglo, letra, palabraAAdivinar }) {


  
 // const [contador, setContador] = useState(0)
 // const [estado, setEstado] = useState(false)

  useEffect(() => {

  }, [contador])

  if (contador > 6) {

    console.log("GameOver")
    //setTimeout(() => { setContador(0) }, 2000) // Espera 2 segundos para reinicar el contador
  }
  /* const Aunmentar = ()=>{
       setContador(contador+1)
   }*/
  let palabraAAdivinar_array = []
  palabraAAdivinar_array = palabraAAdivinar.split("")// separa cada palabra en un arreglo
  console.log(palabraAAdivinar_array)


  const encontrarPalabra = () => {
   let acertar=false;
    
    //  setPalabraAAdivinar(palabraAAdivinar.map((letraAA, index) => letraAA === letra ? palabraArreglo[index] = letra : palabraArreglo[index])) //

    for (let i = 0; i < palabraAAdivinar.length; i++) {

      if (letra === palabraAAdivinar[i]) {

        palabraArreglo[i] = letra ;
        acertar=true;
       // setEstado(true)
      }
     // else{
       // useState(false)
       // setContador(contador +1)
    //  }
    //  return estado;
    }
    if (acertar===false) {
    //  Aunmentar();
       contador++;
     // setContador(contador + 1 )
      /*  if(acertar===false){
         setContador(state => state+1)
         acertar=true;*/
    }
    
    console.log(acertar)

    /*  if(acertar===false){
        setContador(state => state+1)
        acertar=true;
      }*/
  }


  if (letra.length > 0) {
    encontrarPalabra();

  }
  /*const reset=()=>{
    contador=0;


  }*/
  console.log(contador)

  return (
    <div className="Juego">

      <img src={require(`../../img/${contador}.png`)} alt='imgA'  />

      <p>{palabraArreglo}</p>
      <Button variant="warning"  >
        <Link to='/' className="btn btn-principal">Volver </Link>
      </Button>
       <button onClick={() => window.location.reload()}>Refresh</button>;
  
    </div>
  )
}


export default Juego;