import React, { useState, useEffect } from 'react'
import style from './Task.module.scss'

export default React.memo(function Task({ item, column, tasks, changeColumnAPI, counter, setCounter }) {
  console.log('Task');
  const [changingValue, setChangingValue] = useState(null)
  const [counterForChanging, setCounterForChanging] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/changingValue')
      .then(responce => responce.json())
      .then(changingValue => setChangingValue(changingValue.value))
  }, [])

  function closeTask(columnId, taskId) {
    tasks.map(column => {
      if (columnId === column.id) {
        const newColumn = { ...column, tasks: column.tasks.filter(task => task.id !== taskId) }
        changeColumnAPI(columnId, newColumn)
        setCounter(counter + 1)
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
        setCounter(counter + 1)
      } else {
        const newColumn = {
          ...column,
          tasks: column.tasks.map(task => { return { ...task, isChanging: false } })
        }
        changeColumnAPI(newColumn.id, newColumn)
        setCounter(counter + 1)
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
        // setCounterForChanging(counterForChanging + 1)
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
        setCounter(counter + 1)
      }
    })
  }

  return (
    <React.Fragment>
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
  )
})
