import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login';
import Regiones from './components/Regiones/Regiones';
import Casas from './components/Casas/Casas';
import Dashboard from './components/Dashboard/Dashboard';



const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route path='/regiones' element={<Regiones/>} />
          <Route path='/casas' element={<Casas/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
