
import diccionario from "../json/diccionario.json"
import Juego from "../componente/JuegoAhorcadito/Juego"
import Tablero from "../componente/JuegoAhorcadito/Tablero";
import {  useEffect, useState } from "react";
import "../style/Ahorcadito.css";
import React from 'react';

 function Ahorcadito(){
   
    let arrayDiccionario = Array.from(diccionario);
    
    const [palabraAAdivinar,setPalabraAAdivinar]=useState(""); // palabra que se intenta adivinar
    const [palabraArreglo, setPalabraArreglo] = useState([]);
    const [letra,setLetra]= useState("")

    useEffect(()=>{ 
    let numAleatorio  = Math.floor(Math.random()*diccionario.length);
   setPalabraAAdivinar(  diccionario[numAleatorio]) 
   
    },[])
    useEffect(()=>{ 
    setPalabraArreglo(Array( palabraAAdivinar.length).fill("_ "))
    },[palabraAAdivinar])
    
        console.log(letra)
    return(
        <main>
        <div className="Container"> 
        <Juego palabraArreglo={palabraArreglo} letra={letra} palabraAAdivinar={palabraAAdivinar} />
        </div>
        <div className="Boton_juego">
        <Tablero setLetra = {setLetra} />
        </div>
        </main>
        
    );
}
export default Ahorcadito;