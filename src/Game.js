import {BrowserRouter as Router, Routes, Route, Form} from 'react-router-dom';
import Home from './componente/Home';
import MenuArkanoid from './componente/MenuArkanoid';
import ArkanoidLv1 from "./componente/ArkanoidLv1";
import ArkanoidLv2 from './componente/ArkanoidLv2';
import Desarrolladores from './componente/Desarrolladores';
import Ahorcadito from './componente/Ahorcadito';
import PiedraPapelTijera from './componente/PiedraPapelTijera';
import JuegoMemoria from './componente/JuegoMemoria';
import JuegoPhaser from './componente/JuegoPhaser';
import TaTeTi from './componente/Ta-Te-Ti';


function Game() {
  return (
  
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Ahorcadito' element={<Ahorcadito/>}/>
        <Route path='/PiedraPapelTijera' element={<PiedraPapelTijera/>}/>
        <Route path='/Desarrolladores' element={<Desarrolladores/>}/>
        <Route path='/MenuArkanoid' element={<MenuArkanoid/>}/>        
        <Route path='/Arkanoid1' element={<ArkanoidLv1/>}/>
        <Route path='/Arkanoid2' element={<ArkanoidLv2/>}/>
        <Route path='/JuegoMemoria' element={<JuegoMemoria/>}/>
        <Route path='/Ta-Te-Ti' element={<TaTeTi/>}/>
        <Route path='/JuegoPhaser' element={<JuegoPhaser/>}/>
      </Routes>
    </Router>
    
  );
}

export default Game;