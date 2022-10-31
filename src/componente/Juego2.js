import Escene2 from "./Juego/Escene2";
import sonido1 from '../sounds/sonido1.mp3';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Phaser from "phaser";
import { useEffect, useState } from "react";
import Win2 from "./Juego/Win2";
import Gameover2 from "./Juego/GameOver2";

function Juego2(){
    
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
        scene: [Escene2, Win2, Gameover2 ]    
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
export default Juego2;
