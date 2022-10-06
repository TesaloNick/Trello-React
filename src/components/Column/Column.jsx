import React from 'react'
import style from './Column.module.scss'

export default React.memo(function Column({ column, children }) {
  console.log('Column');
  return (
    <div className={style.surface__column} id={column.id}>
      {children}
    </div>
  )
})
