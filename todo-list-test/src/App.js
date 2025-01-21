// 할 일 데이터 관리

import React, { useCallback, useMemo, useReducer, useRef, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";

const mokTodo = [
  {
    id: 0,
    isDone: false,
    context: "React 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    context: "HTML 만들기",
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    context: "SQL 복습하기",
    createDate: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch(action.type) {
    case 'CREATE' : {
      return [action.newItem, ...state] //action.newItem  + 줄임 ...state에 더한다
    }
    case 'UPDATE' : {
      return state.map(it => it.id === action.targetId ? {...it, isDone : !it.isDone} : it
      )
    }
    case 'DELETE' : {
      return state.filter(it=> it.id !== action.targetId)
      
    }
    default :
    return state;
  }

}

      // 가상의 컴포넌트을 활용해 그룹핑을 설정해준다
      export const TodoStateContext = React.createContext() //함수
      export const TodoDispatchContext = React.createContext() //함수
function App() {
  const idRef = useRef(3);
  const [todo, dispatch] = useReducer(reducer ,mokTodo);


  const onCreate = (content) => {
    console.log('클릭');
    
    dispatch({
      type: 'CREATE', // <-- 올바른 타입
      newItem: {
        id: idRef.current,
        context:content, // 'content' 속성 대신 'context'로 일치시켜야 함
        isDone: false,
        createDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  const onUpdate = useCallback((targetId) => {   
    dispatch({
      type: 'UPDATE',
      targetId : targetId
    })
  },[])


  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    })
  },[])
  console.log(todo);

  const memoizeDispatch = useMemo(()=> {
    return {onCreate, onUpdate, onDelete}
  }, [])
 

  return (
    <div className="App">
       <Header />
      <TodoStateContext.Provider value={{todo}}>
      <TodoDispatchContext.Provider value={memoizeDispatch}>
      <TodoEditor />
      <TodoList/>
      </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
