import React from 'react'
import headerLogo from '../../assets/img/header-logo.gif'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <img src={headerLogo} alt="" className="header__logo" />
      </div>
    </header>
  )
}
