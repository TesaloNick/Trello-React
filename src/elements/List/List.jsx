import React, { useState, useEffect } from 'react'
import style from './List.module.scss'
import Task from '../../elements/Task/Task'

export default React.memo(function List({ column, tasks, changeColumnAPI, counter, setCounter }) {
  console.log('List');
  return (
    <div className={style.list}>
      {column.tasks.map(item =>
        <Task key={item.id} item={item} column={column} tasks={tasks} changeColumnAPI={changeColumnAPI} counter={counter} setCounter={setCounter} />
      )}
    </div>
  )
})
