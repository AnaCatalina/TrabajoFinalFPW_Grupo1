import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './componente/Home';
import MenuArknoid from './componente/MenuArknoid';
import ArknoidLv1 from "./componente/ArknoidLv1";
import ArknoidLv2 from './componente/ArknoidLv2';
import Desarrolladores from './componente/Desarrolladores';
import Ahorcadito from './componente/Ahorcadito';
import PiedraPapelTijera from './componente/PiedraPapelTijera';


function Game() {
  return (
  
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Ahorcadito' element={<Ahorcadito/>}/>
        <Route path='/PiedraPapelTijera' element={<PiedraPapelTijera/>}/>
        <Route path='/Desarrolladores' element={<Desarrolladores/>}/>
        <Route path='/MenuAknoid' element={<MenuArknoid/>}/>        
        <Route path='/Aknoid1' element={<ArknoidLv1/>}/>
        <Route path='/Aknoid2' element={<ArknoidLv2/>}/>
      </Routes>
    </Router>
    
  );
}

export default Game;