// 검색에 따라 필터링된 할 일 아이템 렌더링

import React from 'react'
import TodoItem from './TodoItem'

function TodoList({todo}) {
  return (
    <div className='TodoList'>
      <h4>Todo List</h4>
      <input className='searchbar' placeholder='검색어를 입력하세요'/>
      <div className='list_wrapper'>
      {
        todo.map((it)=> (
          <TodoItem {...it} />
        ))
     }
      </div>
    </div>
  )
}

export default TodoList
