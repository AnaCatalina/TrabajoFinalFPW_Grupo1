import classNames from "classnames";
import "../Ta-Te-ti/style/Cuadrado.css";


const Cuadrado = ({value, onClick, turno,gano})=>{

    const apoyarClikear = () =>{ // metodo para analizar el turno dependiendo el valor que le corresponde
      (turno !== null && value === null) && onClick();
    }
    let claseCuadrado = classNames({// logica para agregarle las clases a cada cuadrado, para poder darle la forma de los simbolos
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