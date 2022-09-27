import React from 'react'
import style from './Column.module.scss'
import List from './List/List';
import Head from './Head/Head';
import FormColumn from './FormColumn/FormColumn';

export default function Column({ column, tasks, setTasks }) {
  function changeColumnAPI(columnId, newColumn) {
    fetch('http://localhost:3001/columns/' + columnId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newColumn)
    })
  }

  return (
    <div className={style.surface__column} id={column.id}>
      <Head column={column} setTasks={setTasks} />
      <List column={column} tasks={tasks} changeColumnAPI={changeColumnAPI} />
      <FormColumn column={column} tasks={tasks} changeColumnAPI={changeColumnAPI} />
    </div>
  )
}
