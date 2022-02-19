import React, { useEffect, useState } from 'react'
import Navbar from '../NavBar/Navbar'
import Card from './Card/Card'
import style from './Inicio.module.css'

const Inicio = () => {
  const [state, setState] = useState({
    username: '',
    islogged: true,
    ubicacion: 'SAA Alondra'
  })

  const opciones = [
    {
      nombre: 'Listado de vecinos',
      link: 'lista',
      logo: 'MdFamilyRestroom'
    },
    {
      nombre: 'Administracion de usuarios',
      link: 'adminusuarios',
      logo: 'MdOutlineVerifiedUser'
    },
    {
      nombre: 'Administracion de vecinos',
      link: 'adminvecinos',
      logo: 'IoLogoOctocat'
    },
    {
      nombre: 'Enviar correo masivo',
      link: 'email',
      logo: 'MdAlternateEmail'
    }
  ]

  return (
        <div>
            <div>
                <Navbar user= {state}/>
                <div className={'container ' + style.cuerpo}>
                    <div className={style.grupo}>
                        {
                            opciones.map(opciones => {
                              return (
                                    <Card key={opciones.link} opciones={opciones}/>
                              )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Inicio
