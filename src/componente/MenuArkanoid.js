import "../style/Home.css";
import { Link } from "react-router-dom";
import Inicio from "../img/fondoArk.jpg";
import Button from "react-bootstrap/Button";
import sonido1 from "../sounds/sonido1.mp3";

export default function MenuArknoid() {

    function play() {
        new Audio(sonido1).play();
    }
    return (
        <div className="home">
            <h1>Arkanoid</h1>
            <img src={Inicio} alt="Juego" className="rounded mx-auto d-block" />

            <div className="d-grid gap-2 col-6 mx-auto " >
                <Button variant="outline-success" size="lg" >
                    <Link to='/Arkanoid1' className="btn btn-principal" onClick={play}>Jugar Nivel 1</Link>
                </Button>
                <Button variant="outline-danger" size="lg" >
                    <Link to='/Arkanoid2' className="btn btn-principal" onClick={play}>Jugar Nivel 2</Link>
                </Button>

            </div>
            <Button variant="warning" >
                <Link to='/' className="btn btn-principal"onClick={play}>Volver</Link>
            </Button>
        </div>

    )
};