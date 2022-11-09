import React from "react";
import vuelta from '../../img/imgJuegoMenoria/atrascarta.png';


const Carta = ()=>{
return(
    <div className="carta rotate" >
        <img className="img-carta" src={vuelta} alt='vuelta'/>
    </div>
);

}

export default Carta;