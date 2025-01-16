// 할 일 아이템의 수정 및 삭제

import React from 'react'

function TodoItem({id, content, isDone, createDate}) {
  return (
    <div className='TodoItem'>
      <div className='checkbox_col'>
        <input type='checkbox'/>
      </div>
      <div className='title_col'>할일</div>
      <div className='date_col'>{new Date().toLocaleDateString()}</div>
      <div className='btn_col'>
        <button>삭제</button>
      </div>
    </div>
  )
}

export default TodoItem
