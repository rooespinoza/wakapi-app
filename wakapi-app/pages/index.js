import React, { Fragment, useEffect, useState } from 'react'
import styles from './dashboard.module.scss'
import Head from '../components/head'
import Button from '../components/Button'
import Registros from '../components/Registros'
import { Formik } from 'formik'
import { date, object, string, mixed } from 'yup'
import { getCountry } from '../utils/fetches'
import dayjs from 'dayjs'
import InputMask from 'react-input-mask'
export async function getServerSideProps(context) {
  const { data } = await getCountry();
  return {
    props: {
      countries: data
    },
  }
}
const initialUsers = [{name:'Laura',date:'12/12/1992',country:'Alemania'}];
export const Dashboard = ({ countries }) => {
  const [width, setWidth] = useState(0)
  const [users, setUsers] = useState(initialUsers);

  const renderCountry = () => {
    return countries.map(c => (
      <option key={c.alpha3code} value={c.name}>
        {c.name}
      </option>
    ))
  }
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  

  const submitForm = (values, actions) => {
    const u = {id:users.length+1,name:values.name,date:values.date,country:values.country}
    setUsers([...users,u]);    
  }
  const parseDateString = (value, originalValue) => {
    const parsedValue = (dayjs(originalValue, 'DD/MM/YYYY').format('MM/DD/YYYY'))
    return new Date(parsedValue)
  }
  const validationSchema = () => object().shape({
    name: string()
      .required('¿Cómo es tu nombre?'),
    date: date()
      .transform(parseDateString)
      .max(dayjs().subtract(2, 'years'), '¿Y ya sabes escribir?')
      .min(dayjs().subtract(120, 'years'), 'Revisa el año de tu nacimiento.')
      .typeError('Ingresa una fecha de nacimiento válida: mes/día/año')
      .required('Contanos cuándo naciste')
  })
  const renderFormik = ({ values, handleBlur, handleSubmit, handleChange, errors, touched, isSubmitting }) => {
    return (
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
        <br />
        <label>Fecha de Nacimiento</label>
        <InputMask
          mask="99/99/9999"
          name="date"
          inputMode="numeric"
          placeholder="mm/dd/año"
          value={values.date}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.date && touched.date && (
          <div className={styles["form--error"]}>
            {errors.date}
          </div>
        )}
        <br />
        <label>País</label>
        <select name="country">
          {renderCountry()}
        </select>
        <div className={styles.button__container}>
          <Button primary type="submit">
            Guardar datos
        </Button>
        </div>

      </form>
    )
  }

  return (
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
              name: '',
              date: '',
              country: ''
            }}
            validationSchema={validationSchema}
            onSubmit={submitForm}
          >
            {renderFormik}
          </Formik>
          <div className={styles.footer__container}>
            {width < 480 ?
              <Button secondary type="button">
                Ver registros
              </Button>
              :
              <Fragment></Fragment>
            }
            <div className={styles.terms__container}>
              Al registrar los datos aceptas los Terminos y Condiciones
            </div>
          </div>
        </div>
        
         <Registros data={users}/>

      </div>
    </Fragment>
  )
}
export default Dashboard;