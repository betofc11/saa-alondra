import React, { useState } from 'react'
import Navbar from '../../NavBar/Navbar'
import styles from './VecinosEdit.module.css'

const VecinosEdit = () => {
  const [state, setState] = useState({
    ubicacion: 'Editar Vecino'
  })
  return (
    <div>
      <Navbar user={state} />
      <div className={`container ${styles.cuerpo}`}>
        <h1> Vecinos edit </h1>
      </div>
    </div>
  )
}
export default VecinosEdit
