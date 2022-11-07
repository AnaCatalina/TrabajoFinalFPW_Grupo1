import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


class DevsMain extends React.Component {
    render() {
        return (
            <main className='mainDevs'>
                    <Card border="info" style={{ width: '25rem' }} className='cardDev'>
                    <Card.Header className='nameDev'>{this.props.nombre}</Card.Header>
                    <Card.Img variant="top" src={this.props.perfil} className='fotoPerfil' />
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{this.props.edad}</ListGroup.Item>
                            <ListGroup.Item>{this.props.intereses}</ListGroup.Item>
                            <ListGroup.Item>{this.props.linkGit}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>                              
            </main>
        )
    }
}

export default DevsMain