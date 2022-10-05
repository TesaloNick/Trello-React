import React, { useState, useEffect } from 'react'
import style from './Surface.module.scss'
import Form from '../../elements/Form/Form';
import Column from '../Column/Column';
import List from '../../elements/List/List';
import Head from '../../elements/HeadColumn/HeadColumn';
import FormColumn from '../../elements/FormColumn/FormColumn';

export default function Surface() {
  const [tasks, setTasks] = useState([])
  const [counter, setCounter] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/columns')
      .then((responce) => responce.json())
      .then(tasks => setTasks(tasks))
  }, [counter])

  function changeColumnAPI(columnId, newColumn) {
    fetch('http://localhost:3001/columns/' + columnId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newColumn)
    })
    setCounter(counter + 1)
  }

  return (
    <div className={style.container} >
      <div className={style.surface}>
        {tasks.map(column =>
          <Column key={column.id} column={column}>
            <Head column={column} setTasks={setTasks} counter={counter} setCounter={setCounter} />
            <List column={column} tasks={tasks} changeColumnAPI={changeColumnAPI} counter={counter} setCounter={setCounter} />
            <FormColumn column={column} tasks={tasks} changeColumnAPI={changeColumnAPI} counter={counter} setCounter={setCounter} />
          </Column>
        )}
        <Form counter={counter} setCounter={setCounter} />
      </div>
    </div >
  )
}
