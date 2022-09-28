import React from 'react'
import style from './FormColumn.module.scss'

export default function FormColumn({ column, tasks, changeColumnAPI, counter, setCounter }) {
  function addTask(e, columnId) {
    e.preventDefault()
    tasks.map(column => {
      if (columnId === column.id) {
        const newColumn = {
          ...column,
          inputValue: '',
          tasks: [...column.tasks, {
            id: columnId + '_' + Math.round(Math.random() * 100000000000000000),
            content: e.target.firstChild.value,
            isChanging: false,
          }]
        }
        changeColumnAPI(columnId, newColumn)
        setCounter(counter + 1)
      }
    })
    e.target.reset()
  }

  return (
    <form action="" className={style.surface__taskForm} onSubmit={(e) => addTask(e, column.id)}>
      <input type="text" className={style.surface__taskInput} placeholder="+ Add task" required />
    </form>
  )
}
