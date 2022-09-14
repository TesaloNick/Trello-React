import React from 'react'
import './Surface.css'

export default function Surface() {
  let surface = document.querySelector('.surface')
  let formAddColumn = document.querySelector('.surface__add-column-form')
  let tasks = JSON.parse(localStorage.getItem('tasks')) || []
  let counterColumns = JSON.parse(localStorage.getItem('counterColumns')) || 0
  let task = null
  let background = null
  let shiftY = null
  let shiftX = null
  let eventMove = null
  let eventUp = null
  let eventOver = null

  function events() {
    //   surface.addEventListener('keypress', (e) => changeTask(e))
    //   surface.addEventListener('mousedown', (e) => onMouseDown(e))
  }

  events()

  function printTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))   // перезапись localStorage
  }

  function addColumn(e) {
    e.preventDefault()
    if (e.target.closest('.surface__add-column-form')) {
      tasks.push({
        id: 'column' + counterColumns,
        head: e.target.closest('.surface__add-column-form').querySelector('.surface__add-column-input').value,
        tasks: []
      })
      counterColumns++
      localStorage.setItem('counterColumns', JSON.stringify(counterColumns))
      printTasks(tasks)
    }
  }

  function closeColumn(e) {
    if (e.target.closest('.head__close')) {
      tasks = tasks.filter(column => column.id !== e.target.closest('.surface__column').id)
      printTasks(tasks)
    }
  }

  function addTask(e) {
    e.preventDefault()
    if (e.target.closest('.surface__task-form')) {
      tasks.map(column => {
        if (e.target.closest('.surface__column').id == column.id) {
          column.tasks.push({
            id: e.target.closest('.surface__column').id + '_' + Math.round(Math.random() * 100000000000000000),
            content: e.target.closest('.surface__task-form').querySelector('.surface__task-input').value
          })
        }
      })
      printTasks(tasks)
    }
  }

  function changeTask(e) {
    if (e.type === 'keypress' && e.key === "Enter" && e.target.closest('.task__content')) {
      e.preventDefault();
      tasks = tasks.map(column => e.target.closest('.surface__column').id === column.id ?
        {
          ...column, tasks: column.tasks.map(item => e.target.closest('.task').id === item.id ?
            { ...item, content: e.target.value } :
            item)
        } :
        column
      )

      printTasks(tasks)
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }

  function addInputForChanging(e) {
    if ((e.target.closest('.task__content') && e.type === 'dblclick') || (e.target.closest('.task__change') && e.type === 'click')) {
      let inputForChanging = e.target.closest('.task').querySelector('.task__content')
      inputForChanging.style.height = e.target.closest('.task').querySelector('.task__content').offsetHeight + 'px'
      inputForChanging.innerHTML = `
          <input type = "text" class="task__new-text" value = '${inputForChanging.textContent}' required>
        `
      inputForChanging.querySelector('.task__new-text').focus()
    }
  }

  function closeTask(e) {
    if (e.target.closest('.task__close')) {
      tasks.map(column => {
        if (e.target.closest('.surface__column').id = column.id) {
          let newList = column.tasks.filter(task => task.id !== e.target.closest('.task').id)
          column.tasks = newList
        }
      })
      printTasks(tasks)
    }
  }

  function onMouseDown(event) {
    if (event.target.closest('.task')) {
      task = event.target.closest('.task')
      background = document.createElement('div')
      shiftY = event.clientY - task.getBoundingClientRect().top;
      shiftX = event.clientX - task.getBoundingClientRect().left;

      eventUp = onMouseUp.bind(this)
      document.addEventListener('mouseup', eventUp)
      eventMove = onMouseMove.bind(this)
      document.addEventListener('mousemove', eventMove)
    }
  }

  function onMouseMove(event) {

    background.style.height = task.clientHeight + 'px'
    background.style.width = task.clientWidth + 'px'
    background.style.borderRadius = '3px'
    background.style.backgroundColor = '#bfbfbf'
    task.insertAdjacentElement('afterend', background)

    task.style.position = 'absolute';
    task.style.zIndex = 1000;
    task.style.width = task.closest('.list').clientWidth + 'px'
    task.style.top = event.pageY - shiftY + 'px';
    task.style.left = event.pageX - shiftX + 'px';
  }

  function onMouseUp(event) {
    document.removeEventListener('mousemove', eventMove);
    if (background.clientHeight > 0) {
      background.remove()
      eventOver = onMouseOver.bind(this)
      document.addEventListener('mouseover', eventOver)
      task.style.position = 'relative';
      task.style.top = 'auto'
      task.style.left = 'auto'
      task.style.zIndex = 'auto';
    }

    document.removeEventListener('mouseup', eventUp)
  }

  function onMouseOver(event) {
    let targetObject = null
    if (event.target.closest('.surface__column')) {
      tasks = tasks.map(column => task.closest('.surface__column').id === column.id ?
        {
          ...column, tasks: column.tasks.filter(item => {
            if (item.id !== task.id) {
              return item.id !== task.id
            } else {
              targetObject = item
            }
          })
        } :
        column
      )

      tasks = tasks.map(column => event.target.closest('.surface__column').id === column.id ?
        { ...column, tasks: [...column.tasks, targetObject] } :
        column
      )

      printTasks(tasks)
    }
    document.removeEventListener('mouseover', eventOver)
  }

  return (
    <div className="container" >
      <div className="surface">
        {tasks.map((column, index) =>
          <div className="surface__column" id={column.id} key={index}>
            <div className="head">
              <div className="head__content">{column.head}</div>
              <div className="head__close" onClick={(e) => closeColumn(e)}></div>
            </div>
            <div className="list">
              {column.tasks.map((item, index) =>
                <div className='task' id={item.id} key={index} onMouseDown={(e) => onMouseDown(e)}>
                  <div className="task__content" onDoubleClick={(e) => addInputForChanging(e)} onKeyPress={(e) => changeTask(e)}>{item.content}</div>
                  <div className="task__change" onClick={(e) => addInputForChanging(e)}></div>
                  <div className="task__close" onClick={(e) => closeTask(e)}></div>
                </div>
              )}
            </div>
            <form action="" className="surface__task-form" onSubmit={(e) => addTask(e)}>
              <input type="text" className="surface__task-input" placeholder="+ Add task" required />
            </form>
          </div>
        )}
        <form action="" className="surface__add-column-form" onSubmit={(e) => addColumn(e)}>
          <input type="text" className="surface__add-column-input" placeholder="+ Add column" required />
        </form>
      </div>
    </div >
  )
}
