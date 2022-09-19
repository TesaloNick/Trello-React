import React from 'react'
import headerLogo from '../../assets/img/header-logo.gif'
import style from './Header.module.scss'

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <img src={headerLogo} alt="" className={style.header__logo} />
      </div>
    </header>
  )
}
