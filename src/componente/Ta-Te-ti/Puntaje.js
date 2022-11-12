import './style/Puntaje.css';

const Puntaje = ({puntajeX, puntajeO}) =>(
    <div className="puntaje-tablero">
        <div>{puntajeX} Jugador X</div>
        <div>{puntajeO} Jugador O</div>
    </div>

)
export default Puntaje; 