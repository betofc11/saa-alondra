import React, { useEffect, useState } from 'react'
import Navbar from '../NavBar/Navbar'
import styles from './Email.module.css'
import { IoPaperPlaneSharp, IoCloseSharp } from 'react-icons/io5'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

const Email = () => {
  const [state, setState] = useState({
    ubicacion: 'Email',
    destinatarios: '',
    destinatariosF: '',
    arrayDestinatarios: [],
    mensaje: '',
    asunto: ''
  })

  const validationSchema = yup.object({
    mensaje: yup.string().required('Ingrese un mensaje'),
    asunto: yup.string().required('Ingrese un asunto')
  })

  const validationD = yup.object({
    destinatarios: yup.string().email('Formato de email incorrecto')
  })

  const onSubmit = async (values) => {
    console.log({ ...values, state })
  }

  const onAddDestinatarios = async (values) => {
    validationD.isValid({ destinatarios: values.destinatarios }).then(res => {
      const val = state.arrayDestinatarios
      let destf = ''
      val.push(values.destinatarios)
      val.forEach((val, i) => {
        if (i === 0) {
          destf = destf + val
        } else {
          destf = destf + ', ' + val
        }
      })
      console.log(destf)
      setState({
        ...state,
        arrayDestinatarios: val,
        destinatariosF: destf + ''
      })
    })
  }

  const rendDest = () => {
    if (state.arrayDestinatarios.length > 0) {
      return (
        <div className= {styles.boxDestinatarios}>
          { boxDestinatarios() }
        </div>
      )
    }
  }

  const removeEmail = (e) => {
    const lista = state.arrayDestinatarios
    const val = parseInt(e.target.value)
    lista.splice(val, 1)
    setState({
      ...state,
      arrayDestinatarios: lista
    })
  }

  const boxDestinatarios = () => {
    const destinatarios = state.arrayDestinatarios
    let a
    if (state.arrayDestinatarios.length > 0) {
      a = destinatarios.map((correo, index) => {
        return (
      <div key ={index}>{correo}<button value = { index } className={`btn ${styles.btnDelete}`} type="button" onClick={ removeEmail }><IoCloseSharp/></button></div>
        )
      })
    } else {
      a = (<span></span>)
    }
    return a
  }

  return (
    <div>
      <Navbar user={state} />
      <div className={`container ${styles.container}`}>
        <Formik
          initialValues={state}
          validationSchema={validationD}
          validator={() => {}}
          onSubmit={
            async (values, { resetForm }) => {
              await onAddDestinatarios(values)
              resetForm()
            }
          }>
            <Form>
              <Field
                name = 'destinatarios'
                type = 'text'
                id = 'destinatarios'
                className = 'form-control w-100'
                placeholder = 'Destinatarios'>
              </Field>
            </Form>
        </Formik>
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
            {
              rendDest()
            }
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
