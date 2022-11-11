import Escene from "./JuegoPhaser/Escene";
import Escene2 from "./JuegoPhaser/Escene2";
import Escene3 from "./JuegoPhaser/Escene3";
import sonido1 from '../sounds/sonido1.mp3';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Phaser from "phaser";
import { useEffect, useState } from "react";
import WinLv1 from './JuegoPhaser/Menu2022/WinLv1';
import WinLv2 from './JuegoPhaser/Menu2022/WinLv2';
import Gameover from "./JuegoPhaser/Menu2022/GameOver";

function Juego(){
    
    function play(){
        new Audio(sonido1).play();
    }
    
    const[listo, setListo] = useState(false);
useEffect(() => {
    var config = {
        type: Phaser.AUTO,
        scale:{
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            width: 800,
            height: 600,
        },
        
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { x: 0 }
            }
        },
        scene: [Escene, Gameover, WinLv1,Escene2,WinLv2,Escene3]    
    };
   
    var game = new Phaser.Game(config);

    game.events.on("LISTO", setListo);

    return () =>{
        setListo (false);
        game.destroy(true);
      
      
    };
   
},[listo]);
    return(
        <Button variant="warning" >
        <Link to='/' className="btn btn-principal"  onClick={play}>Volver</Link>
    </Button>
    )


}
export default Juego;