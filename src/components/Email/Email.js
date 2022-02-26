import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../NavBar/Navbar'
import styles from './Email.module.css'
import Loader from '../Utilities/Loader'
import { IoPaperPlaneSharp, IoCloseSharp } from 'react-icons/io5'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { getRegionById } from '../../services/regionesServices'
const { sendEmail } = require('../../helpers/email_helper')

const Email = (props) => {
  const [state, setState] = useState({
    ubicacion: 'Email',
    destinatarios: '',
    destinatariosF: '',
    arrayDestinatarios: [],
    mensaje: '',
    asunto: '',
    loader: false
  })
  const params = useParams().region

  const validationSchema = yup.object({
    mensaje: yup.string().required('Ingrese un mensaje'),
    asunto: yup.string().required('Ingrese un asunto'),
    destinatariosF: yup.string().required('Ingrese al menos un destinatario')
  })

  const validationD = yup.object({
    destinatarios: yup.string().email('Formato de email incorrecto')
  })

  useEffect(() => {
    if (params) {
      getRegionById(parseInt(params)).then((region) => {
        const vecinos = (JSON.parse(region)).vecinos
        const arr = []
        for (const vecino of vecinos) {
          console.log(!!vecino.email)
          if (vecino.email) {
            arr.push(vecino.email)
          }
        }
        setState({
          ...state,
          arrayDestinatarios: arr
        })
        console.log(arr)
      }).catch((err) => {
        console.error(err)
      })
      console.log(params)
    }
  }, [])

  const onSubmit = async (values) => {
    setState({
      ...state,
      loader: true
    })
    const data = {
      to: state.destinatariosF,
      subject: values.asunto,
      message: values.mensaje
    }
    sendEmail(data).then(res => {
      console.log(res)
    })
    setState({
      ...state,
      loader: false
    })
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
    } else {
      return (
        <div>
        <Field
            name = 'destinatariosF'
            type = 'text'
            id = 'destinatariosF'
            className = 'form-control'
            hidden = 'hidden'>
        </Field>
        <ErrorMessage name='destinatariosF' render={ renderError }/>
        </div>
      )
    }
  }

  const renderError = (message) => <p className="alert alert-danger m-2">{message}</p>

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
      {
        state.loader ? <Loader/> : <span></span>
      }
      <Navbar user={state} />
      <div className={`container ${styles.container}`}>
        <div className={ `${styles.smcont}` }>
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
                <div className={`title ${styles.subtitle}`}>Enviar correo electronico:</div>
                <Field
                  name = 'destinatarios'
                  type = 'text'
                  id = 'destinatarios'
                  className = 'form-control w-100'
                  placeholder = 'Destinatarios'>
                </Field>
                <ErrorMessage name="destinatarios" render ={ renderError }/>
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
              <ErrorMessage name="asunto" render ={ renderError }/>

              <Field
              as="textarea"
              className="form-control"
              name="mensaje"
              id="mensaje"
              placeholder="Mensaje" />
              <ErrorMessage name="mensaje" render ={ renderError }/>
              <div className="form-group m-3">
                <button type="submit" className="btn btn-primary">Enviar <IoPaperPlaneSharp/> </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Email
