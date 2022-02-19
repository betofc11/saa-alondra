import React, { useEffect, useState } from 'react'
import Navbar from '../NavBar/Navbar'
import styles from './Email.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

const Email = () => {
  const [state, setState] = useState({
    ubicacion: 'Email',
    destinatarios: '',
    arrayDestinatarios: ['beto70165304@gmail.com', 'beto70165304@gmail.com', 'beto70165304@gmail.com', 'beto70165304@gmail.com', 'beto70165304@gmail.com', 'beto70165304@gmail.com', 'beto70165304@gmail.com', 'beto70165304@gmail.com', 'beto70165304@gmail.com', 'beto70165304@gmail.com', 'beto70165304@gmail.com', 'beto70165304@gmail.com', 'beto70165304@gmail.com', 'betoamsterdamxd@gmail.com'],
    mensaje: '',
    asunto: ''
  })

  const validationSchema = yup.object({
    destinatarios: yup.string().email('Formato de email incorrecto').required('Necesita ingresar los destinatarios'),
    mensaje: yup.string().required('Ingrese un mensaje'),
    asunto: yup.string().required('Ingrese un asunto')
  })

  const onSubmit = async () => {

  }

  const boxDestinatarios = () => {
    const destinatarios = state.arrayDestinatarios
    const a = destinatarios.map((correo) => {
      return (
      <div key ={correo}>{correo}</div>
      )
    })
    return a
  }

  const onChangeDest = (a) => {
    a.preventDefault()
    console.log(a.target.value)
  }

  return (
    <div>
    <Navbar user={state} />
            <div className={`container ${styles.container}`}>
                <Formik
                initialValues={state}
                validationSchema={validationSchema}
                onSubmit={
                    async (values, { resetForm }) => {
                      await onSubmit(values)
                      resetForm()
                    }
                }>
                    <Form>
                        <Field
                        name = 'destinatarios'
                        type = 'text'
                        id = 'destinatarios'
                        className = 'form-control'
                        onChangeText={ onChangeDest }
                        placeholder = 'Destinatarios'>
                        </Field>
                        <div className= {styles.boxDestinatarios}>
                          { boxDestinatarios() }
                        </div>
                        <Field
                        name = 'asunto'
                        type = 'text'
                        id = 'asunto'
                        className = 'form-control'
                        placeholder = 'Asunto'>
                        </Field>
                        <Field
                        as="textarea"
                        className="form-control"
                        name="mensaje"
                        id="mensaje"
                        placeholder="Mensaje" />
                    </Form>
                </Formik>
            </div>
        </div>
  )
}

export default Email
