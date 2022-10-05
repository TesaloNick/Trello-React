import React from 'react'
import Header from '../components/Header/Header'
import Surface from '../components/Surface/Surface'
import style from './Main.module.scss'

export default function Main() {
  return (
    <div className={style.main}>
      <Header />
      <Surface />
    </div>
  )
}
