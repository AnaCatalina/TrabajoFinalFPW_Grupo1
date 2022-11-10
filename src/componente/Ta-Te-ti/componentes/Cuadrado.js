import classNames from "classnames";
import "../style/Cuadrado.css";


const Cuadrado = ({value, onClick, turno,gano})=>{

    const apoyarClikear = () =>{
      (turno !== null && value === null) && onClick();
    }
    let claseCuadrado = classNames({
        cuadrado:true,
        [`cuadrado--${value}`]: value !==null,
        gano:gano,
    });

    return(
        <div className={claseCuadrado} onClick={() => apoyarClikear()}>

        </div>
    );
}
export default Cuadrado;