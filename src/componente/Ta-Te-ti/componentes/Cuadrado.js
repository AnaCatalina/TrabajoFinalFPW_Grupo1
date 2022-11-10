import "../style/Cuadrado.css";

const Cuadrado = ({value, onClick, turno})=>{

    const clikear = () =>{
       turno !== null && value === null && onClick();
    }

    return(
        <div className="cuadrado" onClick={() => clikear()}>

        </div>
    );
}
export default Cuadrado;