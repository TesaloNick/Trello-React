import React, { useState, useRef, useEffect } from 'react'
import style from './Surface.module.scss'

export default function Surface() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [])
  // const [tasks, setTasks] = useState([])
  const [counterColumns, setCounterColumns] = useState(JSON.parse(localStorage.getItem('counterColumns')) || 0)
  const inputColumn = useRef();
  const [changingValue, setChangingValue] = useState(null)
  // let task = null
  // let background = null
  // let shiftY = null
  // let shiftX = null
  // let eventMove = null
  // let eventUp = null
  // let eventOver = null

  // useEffect(() => {
  //   fetch('http://localhost:3001/columns').then((responce) => responce.json())
  //     .then(tasks => setTasks(tasks))
  // }, [])

  function storeTasks(newTasks) {
    setTasks(newTasks)
    //   fetch('http://localhost:3001/columns', {
    //     method: 'post',
    //     headers: { "Content-type": "application/json" },
    //     body: JSON.stringify({ title, author })
    //   })
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }

  function addColumn(e) {
    e.preventDefault()
    const newTasks = [...tasks, {
      id: 'column' + counterColumns,
      head: inputColumn.current.value,
      inputValue: '',
      tasks: []
    }]
    e.target.reset()

    storeTasks(newTasks)
    setCounterColumns(counterColumns + 1)
    localStorage.setItem('counterColumns', JSON.stringify(counterColumns + 1))
  }

  function closeColumn(columnId) {
    storeTasks(tasks.filter(column => column.id !== columnId))
  }

  function addTask(e, columnId) {
    e.preventDefault()
    const newTasks = tasks.map(column => {
      if (columnId === column.id) {
        return {
          ...column,
          inputValue: '',
          tasks: [...column.tasks, {
            id: columnId + '_' + Math.round(Math.random() * 100000000000000000),
            content: e.target.firstChild.value,
            isChanging: false,
          }]
        }
      } else {
        return column
      }
    })
    e.target.reset()
    storeTasks(newTasks)
  }

  function closeTask(columnId, taskId) {
    const newTasks = tasks.map(column => {
      if (columnId === column.id) {
        return { ...column, tasks: column.tasks.filter(task => task.id !== taskId) }
      } else {
        return column
      }
    })

    storeTasks(newTasks)
  }

  function changeNewTaskNameValue(e, columnId) {
    const newTasks = tasks.map(column => {
      if (columnId === column.id) {
        return { ...column, inputValue: e.target.value }
      } else {
        return column
      }
    })

    storeTasks(newTasks)
  }

  function addInputForChanging(columnId, taskId, taskContent) {
    const newTasks = tasks.map(column => {
      if (columnId === column.id) {
        return { ...column, tasks: column.tasks.map(task => task.id === taskId ? { ...task, isChanging: true } : { ...task, isChanging: false }) }
      } else {
        return { ...column, tasks: column.tasks.map(task => { return { ...task, isChanging: false } }) }
      }
    })

    setChangingValue(taskContent)
    storeTasks(newTasks)
  }

  function changeTaskValue(e, columnId, taskId) {
    const newTasks = tasks.map(column => {
      if (columnId === column.id) {
        setChangingValue(e.target.value)
        return { ...column, tasks: column.tasks.map(task => task.id === taskId ? { ...task, content: e.target.value } : task) }
      } else {
        return column
      }
    })
    storeTasks(newTasks)
  }

  function changeTask(e, columnId, taskId) {
    e.preventDefault()
    const newTasks = tasks.map(column => columnId === column.id ?
      {
        ...column, tasks: column.tasks.map(task => taskId === task.id ?
          {
            ...task,
            content: changingValue,
            isChanging: false
          } :
          task)
      } :
      column
    )

    storeTasks(newTasks)
  }

  // function onMouseDown(event) {
  //   if (event.target.closest('.task')) {
  //     task = event.target.closest('.task')
  //     background = document.createElement('div')
  //     shiftY = event.clientY - task.getBoundingClientRect().top;
  //     shiftX = event.clientX - task.getBoundingClientRect().left;

  //     eventUp = onMouseUp.bind(this)
  //     document.addEventListener('mouseup', eventUp)
  //     eventMove = onMouseMove.bind(this)
  //     document.addEventListener('mousemove', eventMove)
  //   }
  // }

  // function onMouseMove(event) {

  //   background.style.height = task.clientHeight + 'px'
  //   background.style.width = task.clientWidth + 'px'
  //   background.style.borderRadius = '3px'
  //   background.style.backgroundColor = '#bfbfbf'
  //   task.insertAdjacentElement('afterend', background)

  //   task.style.position = 'absolute';
  //   task.style.zIndex = 1000;
  //   task.style.width = task.closest('.list').clientWidth + 'px'
  //   task.style.top = event.pageY - shiftY + 'px';
  //   task.style.left = event.pageX - shiftX + 'px';
  // }

  // function onMouseUp(event) {
  //   document.removeEventListener('mousemove', eventMove);
  //   if (background.clientHeight > 0) {
  //     background.remove()
  //     eventOver = onMouseOver.bind(this)
  //     document.addEventListener('mouseover', eventOver)
  //     task.style.position = 'relative';
  //     task.style.top = 'auto'
  //     task.style.left = 'auto'
  //     task.style.zIndex = 'auto';
  //   }

  //   document.removeEventListener('mouseup', eventUp)
  // }

  // function onMouseOver(event) {
  //   let targetObject = null
  //   if (event.target.closest('.surface__column')) {
  //     const newTasks = tasks.map(column => task.closest('.surface__column').id === column.id ?
  //       {
  //         ...column, tasks: column.tasks.filter(item => {
  //           if (item.id !== task.id) {
  //             return item.id !== task.id
  //           } else {
  //             targetObject = item
  //           }
  //         })
  //       } :
  //       column
  //     )

  //     newTasks = tasks.map(column => event.target.closest('.surface__column').id === column.id ?
  //       { ...column, tasks: [...column.tasks, targetObject] } :
  //       column
  //     )

  //     localStorage.setItem('tasks', JSON.stringify(newTasks))
  //   }
  //   document.removeEventListener('mouseover', eventOver)
  // }

  return (
    <div className={style.container} >
      <div className={style.surface}>
        {tasks.map(column =>
          <div className={style.surface__column} id={column.id} key={column.id}>
            <div className={style.head}>
              <div className={style.head__content}>{column.head}</div>
              <div className={style.head__close} onClick={() => closeColumn(column.id)}></div>
            </div>
            <div className={style.list}>
              {column.tasks.map(item =>
                <div className={style.task} id={item.id} key={item.id}>
                  {item.isChanging ?
                    <form className={style.task__form} onSubmit={(e) => changeTask(e, column.id, item.id)}>
                      <input type="text" value={changingValue} onChange={(e) => changeTaskValue(e, column.id, item.id)} />
                    </form> :
                    <div className={style.task__content} onDoubleClick={() => addInputForChanging(column.id, item.id, item.content)}>{item.content}</div>
                  }
                  <div className={style.task__change} onClick={() => addInputForChanging(column.id, item.id, item.content)}></div>
                  <div className={style.task__close} onClick={() => closeTask(column.id, item.id)}></div>
                </div>
              )}
            </div>
            <form action="" className={style.surface__taskForm} onSubmit={(e) => addTask(e, column.id)}>
              <input type="text" className={style.surface__taskInput} onChange={(e) => changeNewTaskNameValue(e, column.id)} value={column.inputValue} placeholder="+ Add task" required />
            </form>
          </div>
        )}
        <form action="" className={style.surface__addColumnForm} onSubmit={(e) => addColumn(e)}>
          <input type="text" className={style.surface__addColumnInput} placeholder="+ Add column" ref={inputColumn} required />
        </form>
      </div>
    </div >
  )
  // return (
  //   <div className={style.container} >
  //     <div className={style.surface}>
  //       {tasks.map((column, index) =>
  //         <div className={style.surface__column} id={column.id} key={index}>
  //           <div className={style.head}>
  //             <div className={style.head__content}>{column.head}</div>
  //             <div className={style.head__close} onClick={(e) => closeColumn(e)}></div>
  //           </div>
  //           <div className={style.list}>
  //             {column.tasks.map((item, index) =>
  //               <div className={style.task} id={item.id} key={index} onMouseDown={(e) => onMouseDown(e)}>
  //                 <div className={style.task__content} onDoubleClick={(e) => addInputForChanging(e)} onKeyPress={(e) => changeTask(e)}>{item.content}</div>
  //                 <div className={style.task__change} onClick={(e) => addInputForChanging(e)}></div>
  //                 <div className={style.task__close} onClick={(e) => closeTask(e)}></div>
  //               </div>
  //             )}
  //           </div>
  //           <form action="" className={style.surface__taskForm} onSubmit={(e) => addTask(e)}>
  //             <input type="text" className={style.surface__taskInput} placeholder="+ Add task" required />
  //           </form>
  //         </div>
  //       )}
  //       <form action="" className={style.surface__addColumnForm} onSubmit={(e) => addColumn(e)}>
  //         <input type="text" className={style.surface__addColumnInput} placeholder="+ Add column" required />
  //       </form>
  //     </div>
  //   </div >
  // )
}
