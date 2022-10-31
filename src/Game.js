import {BrowserRouter as Router, Routes, Route,Link} from 'react-router-dom';
import Home from './componente/Home';
import Juego from "./componente/Juego";
import Juego2 from './componente/Juego2';

function Game() {
  return (
  
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/juego' element={<Juego/>}/>
        <Route path='/Juego2' element={<Juego2/>}/>
      </Routes>
    </Router>
    
  );
}

export default Game;