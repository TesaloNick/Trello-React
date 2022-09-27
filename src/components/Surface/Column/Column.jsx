import React from 'react'
import style from './Column.module.scss'
import List from './List/List';
import Head from './Head/Head';
import FormColumn from './FormColumn/FormColumn';

export default function Column({ column, tasks, setTasks }) {

  return (
    <div className={style.surface__column} id={column.id}>
      <Head column={column} setTasks={setTasks} />
      <List column={column} tasks={tasks} />
      <FormColumn column={column} tasks={tasks} />
    </div>
  )
}
