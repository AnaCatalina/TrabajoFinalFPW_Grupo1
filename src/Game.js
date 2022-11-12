import {BrowserRouter as Router, Routes, Route, Form} from 'react-router-dom';
import Home from './componente/Home';
import MenuArkanoid from './componente/MenuArkanoid';
import ArkanoidLv1 from "./componente/ArkanoidLv1";
import ArkanoidLv2 from './componente/ArkanoidLv2';
import Desarrolladores from './componente/Desarrolladores';
import Ahorcadito from './componente/Ahorcadito';
import PiedraPapelTijera from './componente/PiedraPapelTijera';
import JuegoMemoria from './componente/JuegoMemoria';
import TaTeTi from './componente/Ta-Te-Ti';
import MenuJuegoPhaser from './componente/MenuJuegoPhaser';
import PhaserNivel1 from './componente/JuegoPhaserLv1';
import PhaserNivel2 from './componente/JuegoPhaserLv2';
import PhaserNivel3 from './componente/JuegoPhaserLv3';


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
        <Route path='/MenuJuegoPhaser' element={<MenuJuegoPhaser/>}/>        
        <Route path='/Nivel1' element={<PhaserNivel1/>}/>
        <Route path='/Nivel2' element={<PhaserNivel2/>}/>
        <Route path='/BossBattle' element={<PhaserNivel3/>}/>
        <Route path='/JuegoMemoria' element={<JuegoMemoria/>}/>
        <Route path='/Ta-Te-Ti' element={<TaTeTi/>}/>
      </Routes>
    </Router>
    
  );
}

export default Game;