import React, { Fragment, useEffect, useState } from 'react'
import styles from './dashboard.module.scss'
import Head from '../components/head'
import Button from '../components/Button'
import { Formik } from 'formik'
import { date, object, string, mixed } from 'yup'
import {getCountry} from '../utils/fetches'
import dayjs from 'dayjs'
export async function getServerSideProps(context) {
  const {data} = await getCountry();
    return {
      props: {data}, 
    }
  } 
export const Dashboard = ({data}) =>{
  const renderCountry = () =>{
    return data.map(c => (
      <option key={c.alpha3code} value={c.name}>
        {c.name}
      </option>
    ))
  }
  const submitForm = () =>{

  }

  const validationSchema = () => object().shape({
    name: string()
    .required('¿Cómo es tu nombre?'),
  })
  const renderFormik = ({ values, handleBlur, handleSubmit, handleChange, errors, touched, isSubmitting }) =>{
    console.log(data)
    return(
      <form onSubmit={handleSubmit} id="formVueltos">
        <label>Nombre</label>
        <input
          id='name'
          name='name'
          values={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && (
          <div className={styles["form--error"]}>
            {errors.name}
          </div>
        )}
        <br/>
        <label>Fecha de Nacimiento</label>
        <input
          id='date'
          name='date'
          values={values.date}
          onChange={handleChange}
          onBlur={handleBlur}
        />
         {errors.date && touched.date && (
          <div className={styles["form--error"]}>
            {errors.date}
          </div>
        )}
        <br/>
        <label>País</label>
        <select name="pais">
          {renderCountry()}
        </select>
        <Button primary type="submit">
          Guardar datos
        </Button>
      </form>
    )
  }
return(
    <Fragment>
      <Head title="Wakapi"></Head>
      <div className={styles.dashboard__container}>
        <div className={styles.title__container}>
          <h1>Hola!</h1>
          <h2>Registremos tus datos</h2>
        </div>
        <div className={styles.form__container}>
        <Formik
          enableReinitialize
          initialValues={{
            name:'',
            date:'',
            country:''
          }}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {renderFormik}
        </Formik>
          <div className={styles.footer__container}>
            <Button secondary type="button">
              Ver registros
            </Button>
            <div className={styles.terms__container}>
              Al registrar los datos aceptas los Terminos y Condiciones
            </div>
          </div>
        </div>        
        
      </div>
    </Fragment>   
)
}
export default Dashboard;