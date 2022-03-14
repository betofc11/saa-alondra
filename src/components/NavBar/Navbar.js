import { useEffect } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import Loader from '../Utilities/Loader'
import style from './Navbar.module.css'
const { React, useState } = require('react')
const { IoRocketSharp, IoPower, IoMenu, IoClose } = require('react-icons/io5')
const { verifyLogged } = require('../../helpers/token_helper')

const Navbar = (user) => {
  const [islog, setLog] = useState(true)
  const [username, setUser] = useState('')
  const [ubicacion, setUbi] = useState(user.user.ubicacion)
  const [load, setLoad] = useState(true)
  const [stateBurger, setStateBurger] = useState(false)
  const [activeBurger, setActiveBurger] = useState('')

  let burgerMen = false

  const handleBurger = () => {
    burgerMen = !burgerMen
    setStateBurger(burgerMen)
    if (burgerMen) {
      setActiveBurger(style.activeBurger)
    } else {
      setActiveBurger('')
    }
  }
  useEffect(() => {
    verifyLogin()
    if (load) { setLoad(false) };
  })

  const islogged = async () => {
    const a = await verifyLogged()
    if (a && username === '') {
      const user = JSON.parse(localStorage.getItem('usuarioLogged')).usuario
      console.log(user)
      setUser(user)
      console.log(username)
    }
    return a
  }

  const verifyLogin = () => {
    try {
      islogged().then(res => {
        console.log(res)
        res ? console.log('ESTA LOGUEADO') : setLog(res)
      })
    } catch (e) {
      console.error(e.message)
    }
  }

  const logOutHandler = () => {
    localStorage.removeItem('usuarioLogged')
    setLog(false)
  }

  return islog
    ? (
        <div className={'container ' + style.container} >
            <div className="d-flex justify-content-center">
              <NavLink to="/">
                <h1 className={'title ' + style.title}>{ubicacion}</h1>
              </NavLink>
                {
                    load ? <Loader /> : <div></div>
                }
            </div>
            <div className={`${style.fullscreen} ms-auto p-3`}>
              <ul className="nav justify-content-end">
                  <li className="nav-item">
                    <span className={'nav-link ' + style.user} href="#"><IoRocketSharp /> {username}</span>
                  </li>
                  <li className="nav-item">
                    <button type="button" className={'btn btn-danger ' + style.btndanger} onClick={logOutHandler}>
                      <span className={style.logout}>Cerrar Sesion </span><IoPower className={style.logoutlogo} />
                    </button>
                  </li>
              </ul>
            </div>
            <div className={`${style.mobile} ms-auto p-3`}>
                <button className={`${style.burgerMenu}`} onClick={ handleBurger }>
                  {
                    stateBurger ? <IoClose className="text-white"/> : <IoMenu className="text-white"/>
                  }
                </button>
            </div>
            <div className={`${style.burgerDisp} ${activeBurger}`}>
              <h2 className="title">Menu</h2>
              <ul className="nav justify-content-center">
                <li className="nav-item">
                  <button type="button" className={'btn btn-danger ' + style.btndanger} onClick={logOutHandler}>
                      <span className={style.logout}>Cerrar Sesion </span><IoPower className={style.logoutlogo} />
                  </button>
                </li>
              </ul>
            </div>
        </div>
      )
    : <Navigate to="/login"/>
}

export default Navbar
