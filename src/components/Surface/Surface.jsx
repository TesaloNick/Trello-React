import React, { useState, useEffect } from 'react'
import style from './Surface.module.scss'
import Form from './Form/Form';
import Column from './Column/Column';

export default function Surface() {
  const [tasks, setTasks] = useState([])
  const [counter, setCounter] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/columns')
      .then((responce) => responce.json())
      .then(tasks => setTasks(tasks))
  }, [counter])

  return (
    <div className={style.container} >
      <div className={style.surface}>
        {tasks.map(column =>
          <Column key={column.id} column={column} tasks={tasks} setTasks={setTasks} counter={counter} setCounter={setCounter} />
        )}
        <Form counter={counter} setCounter={setCounter} />
      </div>
    </div >
  )
}
