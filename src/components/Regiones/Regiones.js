import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import Navbar from '../NavBar/Navbar'
import { IoMail } from 'react-icons/io5'
import DataTable from 'react-data-table-component'
import styles from './Regiones.module.css'
import { getRegionById } from '../../services/regionesServices'

const Regiones = () => {
  const { id } = useParams()
  console.log(id)
  const [region, setRegion] = useState({
    idregion: 0,
    nombre: '',
    vecinos: [],
    ubicacion: 'Regiones',
    emails: []
  })

  const [pending, setPending] = useState(true)

  const columns = [
    {
      name: 'ID Casa',
      selector: row => row.idcasa,
      sortable: true
    },
    {
      name: 'Cedula',
      selector: row => row.cedula,
      sortable: true,
      hide: 'md'
    },
    {
      name: 'Nombre',
      selector: row => row.nombre,
      grow: 2
    },
    {
      name: 'Primer Apellido',
      selector: row => row.primerapellido
    },
    {
      name: 'Segundo Apellido',
      selector: row => row.segundoapellido,
      hide: 'md'
    },
    {
      name: 'Telefono',
      selector: row => row.telefono,
      grow: 2,
      right: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      grow: 4
    },
    {
      name: 'Fecha de nacimiento',
      selector: row => row.fechanac,
      grow: 2,
      hide: 'md'
    },
    {
      name: 'Trabaja',
      selector: row => row.trabaja,
      right: true,
      hide: 'md'
    },
    {
      name: 'Fallecido',
      selector: row => row.fallecido,
      right: true,
      hide: 'md'
    }
  ]

  useEffect(() => {
    getRegionById(parseInt(id)).then((res) => {
      const resjson = JSON.parse(res)
      const emails = []

      for (const email of resjson.vecinos) {
        if (email.email) {
          emails.push(email.email)
        }
      }
      setRegion({
        idregion: resjson.idregion,
        nombre: resjson.nombre,
        vecinos: resjson.vecinos,
        emails: emails
      })
      setPending(false)
    }).catch((err) => {
      console.error(err)
    })
  }, [])
  return (
        <div>
            <Navbar user={region} />
            <div className={'container ' + styles.cuerpo}>
              <NavLink to={`/email/${id}`} className={styles.link}>ENVIAR CORREO <IoMail/></NavLink>
              <DataTable
              theme={'dark'}
              title={`Region de ${region.nombre}`}
              columns={columns}
              data={region.vecinos}
              pointerOnHover={true}
              progressPending={pending}
              highlightOnHover={true}
              response={true}
              pagination
              />
            </div>
        </div>
  )
}

export default Regiones
