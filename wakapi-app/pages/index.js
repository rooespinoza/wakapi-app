import React, { Fragment, useEffect, useState } from 'react'
import styles from './dashboard.module.scss'
import Head from '../components/head'


export const Dashboard = ({}) =>{
return(
    <Fragment>
      <Head title="Wakapi"></Head>
      <div className={styles.dashboard__container}>
        Hola!
      </div>
    </Fragment>   
)
}
export default Dashboard;