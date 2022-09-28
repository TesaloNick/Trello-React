import React from 'react'
import style from './Column.module.scss'
import List from './List/List';
import Head from './Head/Head';
import FormColumn from './FormColumn/FormColumn';

export default function Column({ column, tasks, setTasks, counter, setCounter }) {
  function changeColumnAPI(columnId, newColumn) {
    fetch('http://localhost:3001/columns/' + columnId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newColumn)
    })
    setCounter(counter + 1)
  }

  return (
    <div className={style.surface__column} id={column.id}>
      <Head column={column} setTasks={setTasks} counter={counter} setCounter={setCounter} />
      <List column={column} tasks={tasks} changeColumnAPI={changeColumnAPI} counter={counter} setCounter={setCounter} />
      <FormColumn column={column} tasks={tasks} changeColumnAPI={changeColumnAPI} counter={counter} setCounter={setCounter} />
    </div>
  )
}
