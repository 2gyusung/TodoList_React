// 검색에 따라 필터링된 할 일 아이템 렌더링

import React, { useMemo, useState } from 'react'
import TodoItem from './TodoItem'

function TodoList({todo , onUpdate ,onDelete}) {
  const [search, setSearch] = useState("")

  const getSearchResult = () => {
    return search === "" ? todo : todo.filter((it) => it.context.toLowerCase().includes(search.toLowerCase())) //"" 빈 문자열이면 todo를 반환하고 그렇지 않으면 search의 내용과 일치하는 아이템만 필터링해 반환
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const analyzeTodo = useMemo(() => {
    console.log('analyzeTodo 함수호출');
    const totalCount = todo.length;
    const doneCount = todo.filter((it)=> it.isDone).length;
    const notDoneCount = totalCount - doneCount
    return {
      totalCount,
      doneCount,
      notDoneCount
    }
  },[todo])

  const {totalCount,doneCount,notDoneCount} = analyzeTodo
  return (
    <div className='TodoList'>
      <h4>Todo List</h4>
      <div>
        <div>총개수 : {totalCount}</div>
        <div>완료된 할 일 : {doneCount}</div>
        <div>아직 완료하지 못한 할일 : {notDoneCount}</div>
      </div>
      <input 
      className='searchbar'
      value={search}
      onChange={onChangeSearch}
      placeholder='검색어를 입력하세요'/>
      <div className='list_wrapper'>
      {
        getSearchResult().map((it)=> (
          <TodoItem {...it} key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete}/>
        ))
     }
      </div>
    </div>
  )
}

export default TodoList
