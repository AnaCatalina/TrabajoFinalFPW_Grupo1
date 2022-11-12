import './style/Puntaje.css';

const Puntaje = ({puntajeX, puntajeO}) =>(
    <div className="puntaje-tablero">
        <div>{puntajeX}</div>
        <div>{puntajeO}</div>
    </div>

)
export default Puntaje; 