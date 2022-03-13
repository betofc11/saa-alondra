import React, { useState } from 'react'
import styles from '../Card/Card.module.css'
import { NavLink } from 'react-router-dom'
import Loader from '../../Utilities/Loader'
const { MdOutlineVerifiedUser, MdAlternateEmail, MdFamilyRestroom, MdManageAccounts } = require('react-icons/md')

const Card = (opciones) => {
  const [load, setLoad] = useState(false)

  const getLogo = (text) => {
    console.log(text)
    switch (text) {
      case 'IoLogoOctocat':
        return <MdManageAccounts size={'25%'} className={styles.logo}/>
      case 'MdOutlineVerifiedUser':
        return <MdOutlineVerifiedUser size={'25%'} className={styles.logo}/>
      case 'MdFamilyRestroom':
        return <MdFamilyRestroom size={'25%'} className={styles.logo} />
      case 'MdAlternateEmail':
        return <MdAlternateEmail size={'25%'} className={styles.logo}/>

      default:
        return <div><p>ERROR AL CONSEGUIR EL LOGO</p></div>
    }
  }

  const loader = () => {
    setLoad(true)
  }

  return (
    <NavLink to={`/${opciones.opciones.link}`} onClick={loader} className={styles.link}>
        <div className={'card ' + styles.card}>
            {
                load ? <Loader /> : <div></div>
            }
            <div className={'card-body '}>
                {
                    getLogo(opciones.opciones.logo)
                }
            </div>
            <div className={'card-footer ' + styles.cardtexto}>
                {opciones.opciones.nombre}
            </div>
        </div>
    </NavLink>
  )
}

export default Card
