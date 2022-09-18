import React, { useState } from 'react'
import style from './Surface.module.scss'

export default function Surface() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [])
  const [counterColumns, setCounterColumns] = useState(JSON.parse(localStorage.getItem('counterColumns')) || 0)
  // let task = null
  // let background = null
  // let shiftY = null
  // let shiftX = null
  // let eventMove = null
  // let eventUp = null
  // let eventOver = null

  // function printTasks(tasks) {
  //   localStorage.setItem('tasks', JSON.stringify(tasks))
  // }

  function saveTasks(newTasks) {
    setTasks(newTasks)
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }

  function addColumn(e) {
    e.preventDefault()
    const formColumn = e.target.closest(`.${style.surface__addColumnForm}`)
    const newTasks = [...tasks, {
      id: 'column' + counterColumns,
      head: formColumn.querySelector(`.${style.surface__addColumnInput}`).value,
      tasks: []
    }]
    formColumn.reset()

    saveTasks(newTasks)
    setCounterColumns(counterColumns + 1)
    localStorage.setItem('counterColumns', JSON.stringify(counterColumns + 1))
  }

  function closeColumn(e) {
    const newTasks = tasks.filter(column => column.id !== e.target.closest(`.${style.surface__column}`).id)
    saveTasks(newTasks)
  }

  // function addTask(e) {
  //   e.preventDefault()
  //   if (e.target.closest('.surface__task-form')) {
  //     const newTasks = tasks.map(column => {
  //       if (e.target.closest('.surface__column').id == column.id) {
  //         column.tasks.push({
  //           id: e.target.closest('.surface__column').id + '_' + Math.round(Math.random() * 100000000000000000),
  //           content: e.target.closest('.surface__task-form').querySelector('.surface__task-input').value
  //         })
  //       }
  //     })
  //     localStorage.setItem('tasks', JSON.stringify(newTasks))
  //   }
  // }

  // function changeTask(e) {
  //   if (e.type === 'keypress' && e.key === "Enter" && e.target.closest('.task__content')) {
  //     e.preventDefault();
  //     const newTasks = tasks.map(column => e.target.closest('.surface__column').id === column.id ?
  //       {
  //         ...column, tasks: column.tasks.map(item => e.target.closest('.task').id === item.id ?
  //           { ...item, content: e.target.value } :
  //           item)
  //       } :
  //       column
  //     )

  //     localStorage.setItem('tasks', JSON.stringify(newTasks))
  //   }
  // }

  // function addInputForChanging(e) {
  //   if ((e.target.closest('.task__content') && e.type === 'dblclick') || (e.target.closest('.task__change') && e.type === 'click')) {
  //     let inputForChanging = e.target.closest('.task').querySelector('.task__content')
  //     inputForChanging.style.height = e.target.closest('.task').querySelector('.task__content').offsetHeight + 'px'
  //     inputForChanging.innerHTML = `
  //         <input type = "text" class="task__new-text" value = '${inputForChanging.textContent}' required>
  //       `
  //     inputForChanging.querySelector('.task__new-text').focus()
  //   }
  // }

  // function closeTask(e) {
  //   if (e.target.closest('.task__close')) {
  //     const newTasks = tasks.map(column => {
  //       if (e.target.closest('.surface__column').id = column.id) {
  //         let newList = column.tasks.filter(task => task.id !== e.target.closest('.task').id)
  //         column.tasks = newList
  //       }
  //     })
  //     localStorage.setItem('tasks', JSON.stringify(newTasks))
  //   }
  // }

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
        {console.log(tasks)}
        {tasks.map(column =>
          <div className={style.surface__column} id={column.id} key={column.id}>
            <div className={style.head}>
              <div className={style.head__content}>{column.head}</div>
              <div className={style.head__close} onClick={(e) => closeColumn(e)}></div>
            </div>
            <div className={style.list}>
              {column.tasks.map(item =>
                <div className={style.task} id={item.id} key={item.id}>
                  <div className={style.task__content}>{item.id}</div>
                  <div className={style.task__change}></div>
                  <div className={style.task__close}></div>
                </div>
              )}
            </div>
            <form action="" className={style.surface__taskForm}>
              <input type="text" className={style.surface__taskInput} placeholder="+ Add task" required />
            </form>
          </div>
        )}
        <form action="" className={style.surface__addColumnForm} onSubmit={(e) => addColumn(e)}>
          <input type="text" className={style.surface__addColumnInput} placeholder="+ Add column" required />
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
