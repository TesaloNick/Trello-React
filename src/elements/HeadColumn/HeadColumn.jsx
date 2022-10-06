import React from 'react'
import style from './HeadColumn.module.scss'

export default React.memo(function HeadColumn({ column, counter, setCounter }) {
  console.log('HeadColumn');
  function deleteColumnAPI(columnId) {
    fetch('http://localhost:3001/columns/' + columnId, { method: 'DELETE' })

    setCounter(counter + 1)
  }

  return (
    <div className={style.head}>
      <div className={style.head__content}>{column.head}</div>
      <div className={style.head__close} onClick={() => deleteColumnAPI(column.id)}></div>
    </div>
  )
})
