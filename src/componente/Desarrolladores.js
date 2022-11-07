import { Container, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../style/desarrolladores.css"
import React from "react";
import HeaderDevs from './desarrolladores/HeaderDevs';
import DevsMain from './desarrolladores/DevsMain';
import desarrolladores from "../json/desarrolladores.json"

export default function Desarrolladores() {
    return (
        <Container className='fondoDevs'>
            <Button variant="warning" >
                    <Link to='/' className="btn btn-principal">Volver</Link>
                </Button>
            <Row>
                
                <HeaderDevs></HeaderDevs>
                {desarrolladores.map( devs =>
                    <DevsMain
                        perfil = {devs.perfil}
                        nombre = {devs.nombre}
                        edad = {devs.edad}
                        intereses = {devs.intereses}
                        linkGit = {devs.linkGit}
                        className = "mainDev"
                    />
                )}
            </Row>
        </Container >
    )
};