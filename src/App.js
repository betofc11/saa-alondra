import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login';
import Regiones from './components/Regiones/Regiones';
import Casas from './components/Casas/Casas';
import Lista from './components/Lista/Lista';
import Inicio from './components/Inicio/Inicio';
import UserAdmin from './components/UserAdmin/UserAdmin';



const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Inicio/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route path='/regiones/:id' element={<Regiones/>} />
          <Route path='/casas' element={<Casas/>} />
          <Route path='/lista' element={<Lista/>} />
          <Route path='/adminusuarios' element={<UserAdmin/>} />
          <Route path='*' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
