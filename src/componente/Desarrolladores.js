import { Container, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../style/desarrolladores.css"
import React from "react";
import HeaderDevs from './desarrolladores/HeaderDevs';
import DevsMain from './desarrolladores/DevsMain';
import desarrolladores from "../json/desarrolladores.json"
import sonido1 from '../sounds/sonido1.mp3';

export default function Desarrolladores() {
    function play(){
        new Audio(sonido1).play();
    }
    return (
        <Container className='fondoDevs'>
            
            <Row>

                <HeaderDevs></HeaderDevs>
                {desarrolladores.map(devs =>
                    <DevsMain
                        perfil={devs.perfil}
                        nombre={devs.nombre}
                        edad={devs.edad}
                        intereses={devs.intereses}
                        linkGit={devs.linkGit}
                        className="mainDev"
                    />
                )}
            </Row>
            <Button variant="warning" >
                <Link to='/' className="btn btn-principal" OnClick={play} >Volver</Link>
            </Button>
        </Container >
    )
};
