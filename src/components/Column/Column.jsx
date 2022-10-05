import React from 'react'
import style from './Column.module.scss'

export default function Column({ column, children }) {
  console.log(children);
  return (
    <div className={style.surface__column} id={column.id}>
      {children}
    </div>
  )
}
