import "../style/Home.css";
import { Link } from "react-router-dom";
import Inicio from "../img/grupo1logo.jpg";
import Button from "react-bootstrap/Button";
import sonido1 from '../sounds/sonido1.mp3';


export default function Home(){

    function play(){
        new Audio(sonido1).play();
    }
    return(
        <div className="home">
            <h1>Grupo 1</h1>
            <img src={Inicio} alt="Juego"  className="rounded mx-auto d-block"/>
            
            <div className="d-grid gap-2 col-6 mx-auto " >
                <Button variant="outline-success" size="lg" >
                    <Link to='/piedraPapelTijera' className="btn btn-principal" onClick={play}>Jugar Piedra Papel o Tijera</Link>
                </Button>
                <Button variant="outline-success" size="lg" >
                    <Link to='/ahorcadito' className="btn btn-principal" onClick={play}>Jugar Ahorcadito</Link>
                </Button>
                <Button variant="outline-success" size="lg" >
                    <Link to='/MenuAknoid' className="btn btn-principal" onClick={play}>Jugar Arknoid</Link>
                </Button>
                <Button variant="outline-danger" size="lg" >
                    <Link to='/Ta-Te-Ti' className="btn btn-principal" onClick={play}>Ta-Te-Ti</Link>
                </Button>
                <Button variant="outline-danger" size="lg" >
                    <Link to='/JuegoPhaser' className="btn btn-principal" onClick={play}>Jugar JuegoPhaser</Link>
                </Button> 
                <Button variant="outline-danger" size="lg" >
                    <Link to='/desarrolladores' className="btn btn-principal" onClick={play}>Conocenos</Link>
                </Button>                
            </div>
        </div>
        
    )
};