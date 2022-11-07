import {BrowserRouter as Router, Routes, Route,Link} from 'react-router-dom';
import Home from './componente/Home';
import JuegoArknoidLv1 from "./componente/ArknoidLv1";
import Juego2 from './componente/ArknoidLv2';
import Desarrolladores from './componente/Desarrolladores';
import Ahorcadito from './componente/Ahorcadito';
import PiedraPapelTijera from './componente/PiedraPapelTijera';


function Game() {
  return (
  
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/juego' element={<JuegoArknoidLv1/>}/>
        <Route path='/Ahorcadito' element={<Ahorcadito/>}/>
        <Route path='/PiedraPapelTijera' element={<PiedraPapelTijera/>}/>
        <Route path='/Desarrolladores' element={<Desarrolladores/>}/>
      </Routes>
    </Router>
    
  );
}

export default Game;