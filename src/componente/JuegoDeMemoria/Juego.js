import { Button } from "bootstrap";
import Carta from "./Carta";
import Img from './ImgCarta';

function Juego(props){





    return (
        <div >
           <div className="juego -- score grid grid-2">    
            <div className="juego-- time text-right">
            <p>Tiempo</p>
            </div>
            <div className="juego-- movimientos">
            <p>Movimintos</p>
            </div>
           </div>
        <div className="juego--cartas grid grid-4">
            <Carta imagen='fas fa-horse'/>
        </div>
        <div className="text_center">
            {/*
            <Button label= "Reinicar Juego" action= ""/>
           */ }
        </div>
        </div>
    
    
    
    );
    
    
    
    
    }
    export default Juego;