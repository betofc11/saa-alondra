import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Regiones from './components/Regiones/Regiones'
import Casas from './components/Casas/Casas'
import Lista from './components/Lista/Lista'
import Inicio from './components/Inicio/Inicio'
import UserAdmin from './components/UserAdmin/UserAdmin'
import VecinosAdmin from './components/VecinosAdmin/VecinosAdmin'
import Email from './components/Email/Email'
import VecinosEdit from './components/VecinosAdmin/VecinosEdit/VecinosEdit'

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
          <Route path='/adminvecinos' element={<VecinosAdmin/>} />
          <Route path='/adminvecinos/:id' element={<VecinosEdit/>} />
          <Route path='/email' element={<Email/>} />
          <Route path='/email/:region' element={<Email/>} />
          <Route path='*' element='/'/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
