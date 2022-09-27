import React, { useState, useRef, useEffect } from 'react'
import style from './Surface.module.scss'

export default function Surface() {
  const [tasks, setTasks] = useState([])
  const inputColumn = useRef();
  const [changingValue, setChangingValue] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/columns')
      .then((responce) => responce.json())
      .then(tasks => setTasks(tasks))

    fetch('http://localhost:3001/changingValue')
      .then(responce => responce.json())
      .then(changingValue => setChangingValue(changingValue.value))
  }, [])

  function storeTasks(newTasks) {
    // setTasks(newTasks)
    //   localStorage.setItem('tasks', JSON.stringify(newTasks))
  }

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

  function deleteColumnAPI(columnId) {
    fetch('http://localhost:3001/columns/' + columnId, { method: 'DELETE' })
      .then(tasks => setTasks(tasks))
  }

  function changeColumnAPI(columnId, newColumn) {
    fetch('http://localhost:3001/columns/' + columnId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newColumn)
    })
  }

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
      }
    })
    e.target.reset()
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
    // setChangingValue(taskContent)
    // storeTasks(newTasks)
  }

  function changeTaskValue(e, columnId) {
    const newTasks = tasks.map(column => {
      if (columnId === column.id) {
        setChangingValue(e.target.value)
      }
    })
    storeTasks(newTasks)
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
    <div className={style.container} >
      <div className={style.surface}>
        {tasks.map(column =>
          <div className={style.surface__column} id={column.id} key={column.id}>
            <div className={style.head}>
              <div className={style.head__content}>{column.head}</div>
              <div className={style.head__close} onClick={() => deleteColumnAPI(column.id)}></div>
            </div>
            <div className={style.list}>
              {column.tasks.map(item =>
                <React.Fragment key={item.id}>
                  <div className={style.task} id={item.id} key={item.id} onMouseDown={(e) => onMouseDown(e)}>
                    {item.isChanging ?
                      <form className={style.task__form} onSubmit={(e) => changeTask(e, column.id, item.id)}>
                        <input type="text" value={changingValue} onChange={(e) => changeTaskValue(e, column.id)} />
                      </form> :
                      <div className={style.task__content} onDoubleClick={() => addInputForChanging(column.id, item.id, item.content)}>{item.content}</div>
                    }
                    <div className={style.task__change} onClick={() => addInputForChanging(column.id, item.id, item.content)}></div>
                    <div className={style.task__close} onClick={() => closeTask(column.id, item.id)}></div>
                  </div>
                  <div className={style.background} ></div>
                </React.Fragment>
              )}
            </div>
            <form action="" className={style.surface__taskForm} onSubmit={(e) => addTask(e, column.id)}>
              <input type="text" className={style.surface__taskInput} placeholder="+ Add task" required />
            </form>
          </div>
        )}
        <form action="" className={style.surface__addColumnForm} onSubmit={(e) => addColumn(e)}>
          <input type="text" className={style.surface__addColumnInput} placeholder="+ Add column" ref={inputColumn} required />
        </form>
      </div>
    </div >
  )
}
