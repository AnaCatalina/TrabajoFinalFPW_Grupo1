import Escene from "./Juego/Escene";
import sonido1 from '../sounds/sonido1.mp3';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Phaser from "phaser";
import { useEffect, useState } from "react";
import Win from "./Juego/Win";
import Gameover from "./Juego/GameOver";

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
                gravity: { y: 100 }
            }
        },
        scene: [Escene, Win, Gameover ]    
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
