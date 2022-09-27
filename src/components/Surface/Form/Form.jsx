import React, { useState, useRef } from 'react'
import style from './Form.module.scss'

export default function Form() {
  const inputColumn = useRef();

  function addColumn(e) {
    e.preventDefault()
    const newColumn = {
      head: inputColumn.current.value,
      inputValue: '',
      tasks: []
    }
    addColumnAPI(newColumn)
    e.target.reset()
  }

  function addColumnAPI(newColumn) {
    fetch('http://localhost:3001/columns', {
      method: 'post',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newColumn)
    })
  }

  return (
    <form action="" className={style.surface__addColumnForm} onSubmit={(e) => addColumn(e)}>
      <input type="text" className={style.surface__addColumnInput} placeholder="+ Add column" ref={inputColumn} required />
    </form>
  )
}
