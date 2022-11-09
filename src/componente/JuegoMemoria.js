import React from "react";
import '../style/JuegoMemoria.css';
import Carta from './JuegoDeMemoria/Carta';
import { useEffect, useState } from 'react';

import {imagen} from './JuegoDeMemoria/ImgCarta';

function JuegoMemoria(){

const[card, setCard]= useState([]);

useEffect(() => {

setCard(imagen);

}, []);

return (
    <div className="juegoM">
        <div className=" contenedor-cartas">
        {
            card.map((card) => (
                <Carta/>
            ))
        }
        </div>

    </div>



);




}
export default JuegoMemoria;
