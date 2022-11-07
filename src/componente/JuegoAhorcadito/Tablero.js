import sonido1 from '../../sounds/sonido1.mp3';
import React from "react";
import Button from 'react-bootstrap/Button';
export default function Tablero({setLetra}) {
   
    function play(){
        new Audio(sonido1).play();
    }
     
    let letras = [
        "A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N",
        "Ñ", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"
    ];
    const asignarLetra = (event) =>{
       
       setLetra(event.target.name)
       
    }
    return (
        <div className="Teclado">
        {letras.map((letra,index)=>{
       
     return(
            <Button 
            
            variant="light" 
            key={index}
            className="btn-teclado"
            name={letra}
            onClick={asignarLetra}
            
            >{letra}

            </Button>
            
            );
        })}

        </div>
    );


}