import '../style/desarrolladores.css';
import HeaderDevs from './desarrolladores/HeaderDevs';
import DevsMain from './desarrolladores/DevsMain';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import desarrolladores from '../json/desarrolladores.json';

function Desarrolladores() {
    return (
        <>
            <div className="container-fluid">
                <HeaderDevs />
                
                {desarrolladores.map(devs =>
                    <DevsMain 
                    perfil={devs.perfil}
                    nombre={devs.nombre}
                    edad={devs.edad}
                    intereses={devs.intereses}
                    linkGit={devs.linkGit}
                    />
                )}
                <Button variant="warning" >
                    <Link to='/' className="btn btn-principal">Volver</Link>
                </Button>            
            </div>

        </>
    )
};

export default Desarrolladores