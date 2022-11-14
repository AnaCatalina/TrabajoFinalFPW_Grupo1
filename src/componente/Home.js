import "../style/Home.css";
import { Link } from "react-router-dom";
import Inicio from "../img/grupo1logo.jpg";
import Button from "react-bootstrap/Button";
import sonido1 from '../sounds/sonido1.mp3';
import { Col, Container } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';


export default function Home() {

    function play() {
        new Audio(sonido1).play();
    }
    return (
        <div className="home">
            <h1>Grupo 1</h1>
            <img src={Inicio} alt="Juego" className="rounded mx-auto d-block" />
            <h2>Nuestros Juegos</h2>
            <Col>
                <Button variant="success" size="lg" >
                    <Link to='/piedraPapelTijera' className="btn btn-principal" onClick={play}>Jugar Piedra Papel o Tijera</Link>
                </Button>
                <Button variant="success" size="lg" >
                    <Link to='/ahorcadito' className="btn btn-principal" onClick={play}>Jugar Ahorcadito</Link>
                </Button>
                <Button variant="success" size="lg" >
                    <Link to='/MenuArkanoid' className="btn btn-principal" onClick={play}>Jugar Arkanoid</Link>
                </Button>
            </Col>
            <Col>
                <Button variant="success" size="lg" >
                    <Link to='/Ta-Te-Ti' className="btn btn-principal" onClick={play}>Jugar Ta-Te-Ti</Link><Badge bg="warning" text="dark">New</Badge>
                </Button>
                <Button variant="success" size="lg" >
                    <Link to='/MenuJuegoPhaser' className="btn btn-principal" onClick={play}>Jugar Super Galactic Spaceship</Link>
                    <Badge bg="warning" text="dark">New</Badge>
                </Button>
            </Col>

            <Button variant="danger" size="lg" >
                <Link to='/desarrolladores' className="btn btn-principal" onClick={play}>Conocenos</Link>
            </Button>
            <div className="d-grid gap-2 col-6 mx-auto " >



            </div>
        </div>

    )
};