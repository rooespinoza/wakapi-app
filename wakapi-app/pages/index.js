import React, { Fragment, useEffect, useState } from 'react'
import styles from './dashboard.module.scss'
import Link from 'next/link'
import Head from '../components/head'
import Button from '../components/Button'
import Registros from '../components/Registros'
import {Field, Formik } from 'formik'
import { date, object, string, mixed } from 'yup'
import { getCountry } from '../utils/fetches'
import dayjs from 'dayjs'
import DatePicker,{ registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Lottie from 'react-lottie'
import spinner from '../public/animated/spinner.json';
import tick from '../public/animated/tick.json';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export async function getServerSideProps(context) {
  const { data } = await getCountry();
  return {
    props: {
      countries: data
    },
  }
}
const initialUsers = [];
registerLocale("es", es);
export const Dashboard = ({ countries }) => {
  const [width, setWidth] = useState(0)
  const [users, setUsers] = useState(initialUsers);
  const [isRegistros, setIsRegistros] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const toggleIsRegistros = () => setIsRegistros(!isRegistros)

  const spinnerOptions = {
    loop: true,
    autoplay: true,
    animationData: spinner,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const tickOptions = {
    loop: false,
    autoplay: true,
    animationData: tick,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const renderCountry = () => {
    return countries.map(c => (
      <option key={c.alpha3code} value={c.name}>
        {c.name}
      </option>
    ))
  }
  useEffect(() => {
    setWidth(window.innerWidth)
    if(localStorage.getItem('users')){
      setUsers(JSON.parse(localStorage.getItem('users')))
    }
  }, [])
  const message = (text) => toast(text);
  const submitForm = (values,actions) => {
    const list = users;
    let month = values.date.getMonth()+1
    let date = values.date.getDate()+ "/" + month + "/" + values.date.getFullYear();
    setIsLoading(true);
    const u = { id: users.length + 1, name: values.name, date: date, country: values.country }
    list.push(u)
    setTimeout(() => {
      setIsLoading(false);
      message(<div className={styles.toast__container}><Lottie options={tickOptions} height={50} width={50} />¡Usuario registrado!</div>);
      actions.resetForm()
      setStartDate(new Date())
    }, 1000);
    localStorage.setItem('users', JSON.stringify(list))
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
      .typeError('Ingresa una fecha de nacimiento válida: día/mes/año')
      .required('Contanos cuándo naciste'),
    country: string()
    .required('¿De dónde sos?'),
  })
  const renderFormik = ({ values, handleBlur, handleSubmit, handleChange, errors, touched, isSubmitting,actions }) => {
    return (
      <form onSubmit={handleSubmit} id="formVueltos">
        <label>Nombre</label>
        <Field
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
        <br/>
        <DatePicker selected={startDate} onChange={(date) => {setStartDate(date); values.date=date;}} dateFormat="dd/MM/yyyy" locale='es'/>
        {errors.date && touched.date && (
          <div className={styles["form--error"]}>
            {errors.date}
          </div>
        )}
        <br />
        <label>País</label>
        <Field as="select"
          name="country"
          value={values.country}
          onBlur={handleBlur}
          onChange={handleChange}>
             <option key='0' value='' defaultValue> Seleccione una opción </option>
          {renderCountry()}
        </Field>
        {errors.country && touched.country && (
          <div className={styles["form--error"]}>
            {errors.country}
          </div>
        )}
        <div className={styles.button__container}>
          <Button primary type="submit">
           {isLoading ? 
              <Lottie
                options={spinnerOptions}
                height={17}
              />
              :
              <Fragment>Guardar datos</Fragment>
           } 
            
        </Button>
        </div>

      </form>
    )
  }
  const renderForm = () => {
    return (
      <div className={styles.form}>
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
              <Fragment>
                {users.length == 0 ?
                  <Button secondary type="button" disabled onClick={toggleIsRegistros}>
                    Ver registros
                      </Button>
                  :
                  <Button secondary type="button" onClick={toggleIsRegistros}>
                    Ver registros
                    </Button>
                }
              </Fragment>
              :
              <Fragment></Fragment>
            }
            <div className={styles.terms__container}>              
              Al registrar los datos aceptas los 
              <Link href='/terms'>
                <Button link type='button'>
                  Terminos y Condiciones
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <Fragment>
      <Head title="Wakapi"></Head>
      <div className={styles.dashboard__container}>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
        {width < 480 ?
          <Fragment>
            {!isRegistros ?
              <Fragment>
                {renderForm()}
              </Fragment>
              :
              <Registros data={users} setData={setUsers} toggleIsRegistros={toggleIsRegistros}/>
            }
          </Fragment>
          :
          <Fragment>
            {renderForm()}
            <Registros data={users} setData={setUsers} isLoadign={isLoading} toggleIsRegistros={toggleIsRegistros} />
          </Fragment>
        }


      </div>
    </Fragment>
  )
}
export default Dashboard;