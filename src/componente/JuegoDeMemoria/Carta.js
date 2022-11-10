import React from "react";
import vuelta from '../../img/imgJuegoMenoria/atrascarta.png';
import Img from './ImgCarta';

export default function Carta(props){

return(
    <div className="carta">
        <div className="carta-- inner">
            <div className="carta -- frontal ">
            </div>
            <div className="carta -- atras ">
              <i className= {props.imagen}></i>
            </div>
        </div>
    </div>
);


}