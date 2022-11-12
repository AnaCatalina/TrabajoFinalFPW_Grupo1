import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React from "react";

export default function DevsMain(props) {
    return (
        <Card style={{ width: '25rem' }} border="danger" className='cardDev'>
                <Card.Header className="nameDev" as="h4">{props.nombre}</Card.Header>
                <Card.Img variant="top" src={props.perfil} className="fotoPerfil"  alt="fotoDePerfil"/>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item> Edad: {props.edad}</ListGroup.Item>
                        <ListGroup.Item> Intereses: {props.intereses}</ListGroup.Item>
                        <ListGroup.Item> Link de GitHub: {props.linkGit}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
        </Card>
    );
}

