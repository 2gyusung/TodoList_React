// 새로운 할 일 생성
import React, { useRef, useState } from 'react'

function TodoEditor({onCreate} ) {
  const [content, setContent] = useState("")
  
  const inputRef = useRef();

  const onChangeContent = (e) => { //입력 받은 값 state에 저장
    setContent(e.target.value)
  }
  const onSubmit = () => {// 부모로 보내기
    if(!content) { //입력 폼에서 아무것도 입력하지 않고 추가 버튼 클릭 시 포커스 상태로 멈춤
      inputRef.current.focus()
      return
    }
    onCreate(content) 
    setContent("")
  }
  const onKeyDown = (e) => {
    if(e.keyCode == 13) {
      onSubmit()
    }
  }
  return (
    <div className='TodoEditor'>
      <h4>새로운 Todo 작성하기 📌</h4>
      <div className='editor_wrapper'>
        <input
        ref={inputRef}
        value={content}
        onChange={onChangeContent} 
        onKeyDown={onKeyDown}
        placeholder='새로운 Todo...'/>
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  )
}

export default TodoEditor
