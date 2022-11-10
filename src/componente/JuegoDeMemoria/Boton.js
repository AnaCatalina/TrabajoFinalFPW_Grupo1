

function Boton(props){

    return (
        <button className="button" onClick={props.action}> {props.label}</button>
    
    
    );
    
   
    }
export default Boton;