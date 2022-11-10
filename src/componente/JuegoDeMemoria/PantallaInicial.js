import React from "react";
import '../../style/JuegoMemoria.css';
import Boton from "./Boton";
import Carta from './Carta';
import { useEffect, useState } from 'react';

import {imagen} from './ImgCarta';
import { Button } from "bootstrap";

function PantallaInicial(props){
 const levelText = ['Facil', 'Medio', 'Dificil']
return (
    <div className="juegoM">
        <h1 className='titulo'>Juego de Memoria</h1>
        <div className="opciones">
            <p>Elegir Nivel</p>
            <Boton label={levelText[props.level]} action={props.cambioLevel}/>
            <br/>
            <Boton label='Jugar' action={() => props.setStart(1)} />
        </div>
       

    </div>
);




}
export default PantallaInicial;