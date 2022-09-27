import React, { useState, useEffect } from 'react'
import style from './List.module.scss'

export default function List({ column, tasks }) {
  const [changingValue, setChangingValue] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/changingValue')
      .then(responce => responce.json())
      .then(changingValue => setChangingValue(changingValue.value))
  }, [])

  function changeColumnAPI(columnId, newColumn) {
    fetch('http://localhost:3001/columns/' + columnId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newColumn)
    })
  }

  function closeTask(columnId, taskId) {
    tasks.map(column => {
      if (columnId === column.id) {
        const newColumn = { ...column, tasks: column.tasks.filter(task => task.id !== taskId) }
        changeColumnAPI(columnId, newColumn)
      }
    })
  }

  function addInputForChanging(columnId, taskId, taskContent) {
    tasks.map(column => {
      if (columnId === column.id) {
        const newColumn = {
          ...column, tasks: column.tasks.map(task => task.id === taskId ?
            { ...task, isChanging: true } :
            { ...task, isChanging: false })
        }
        changeColumnAPI(columnId, newColumn)
      } else {
        const newColumn = {
          ...column,
          tasks: column.tasks.map(task => { return { ...task, isChanging: false } })
        }
        changeColumnAPI(newColumn.id, newColumn)
      }
    })

    fetch('http://localhost:3001/changingValue', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "value": taskContent
      })
    })
  }

  function changeTaskValue(e, columnId) {
    tasks.map(column => {
      if (columnId === column.id) {
        setChangingValue(e.target.value)
      }
    })
  }

  function changeTask(e, columnId, taskId) {
    e.preventDefault()
    tasks.map(column => {
      if (columnId === column.id) {
        const newColumn = {
          ...column,
          tasks: column.tasks.map(task => taskId === task.id ? {
            ...task,
            content: changingValue,
            isChanging: false
          } : task)
        }
        changeColumnAPI(columnId, newColumn)
      }
    })
  }

  return (
    <div className={style.list}>
      {column.tasks.map(item =>
        <React.Fragment key={item.id}>
          <div className={style.task} id={item.id} key={item.id} >
            {item.isChanging ?
              <form className={style.task__form} onSubmit={(e) => changeTask(e, column.id, item.id)}>
                <input type="text" value={changingValue} onChange={(e) => changeTaskValue(e, column.id)} />
              </form> :
              <div className={style.task__content} onDoubleClick={() => addInputForChanging(column.id, item.id, item.content)}>{item.content}</div>
            }
            <div className={style.task__change} onClick={() => addInputForChanging(column.id, item.id, item.content)}></div>
            <div className={style.task__close} onClick={() => closeTask(column.id, item.id)}></div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}
