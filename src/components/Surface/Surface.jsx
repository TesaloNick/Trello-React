import React, { useState, useEffect } from 'react'
import style from './Surface.module.scss'
import Form from './Form/Form';
import List from './Column/List/List';
import Head from './Column/Head/Head';
import FormColumn from './Column/FormColumn/FormColumn';

export default function Surface() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/columns')
      .then((responce) => responce.json())
      .then(tasks => setTasks(tasks))
  }, [])

  return (
    <div className={style.container} >
      <div className={style.surface}>
        {tasks.map(column =>
          <div className={style.surface__column} id={column.id} key={column.id}>
            <Head column={column} setTasks={setTasks} />
            <List column={column} tasks={tasks} />
            <FormColumn column={column} tasks={tasks} />
          </div>
        )}
        <Form />
      </div>
    </div >
  )
}
