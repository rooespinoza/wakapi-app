import React, { Fragment, useEffect, useState } from 'react'
import styles from './dashboard.module.scss'
import Head from '../components/head'
import { Formik } from 'formik'


export const Dashboard = ({}) =>{
  const submitForm = () =>{

  }
  const validationSchema = () =>{

  }
  const renderFormik = ({ values, handleBlur, handleSubmit, handleChange, errors, touched, isSubmitting }) =>{
    return(
      <form onSubmit={handleSubmit} id="formVueltos" className={styles.form__container}>
        <label>Nombre</label>
        <input
          id='name'
          name='name'
          values={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <br/>
        <label>Fecha de Nacimiento</label>
        <input
          id='date'
          name='date'
          values={values.date}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <br/>
        <label>País</label>
        <input
          id='contry'
          name='contry'
          values={values.contry}
          onChange={handleChange}
          onBlur={handleBlur}
        />
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
        <Formik
          enableReinitialize
          initialValues={{
            name:'',
            date:'',
            country:''
          }}
          onSubmit={submitForm}
        >
          {renderFormik}
        </Formik>
        
      </div>
    </Fragment>   
)
}
export default Dashboard;