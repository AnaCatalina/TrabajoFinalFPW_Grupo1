import Cuadrado from "./Cuadrado";
import "../style/Tablero.css";


const Tablero = ({cuadrados, onClick, turno, lineaGanadora }) => {

    const crearCuadrados = values =>(
        values.map(value => (
            <Cuadrado 
            gano={lineaGanadora.includes(value)}
            turno ={turno}
            onClick ={() => onClick(value)}
            value={cuadrados[value]}
              key={`cuadrado_${value}`}
            />
        ))
    )
return(
    <div className="tablero">
        <div className="fila">
            {crearCuadrados([0,1,2])}
        </div>
        <div className="fila">
            {crearCuadrados([3,4,5])}
        </div>
        <div className="fila">
            {crearCuadrados([6,7,8])}
        </div>



    </div>


);



}
export default Tablero;