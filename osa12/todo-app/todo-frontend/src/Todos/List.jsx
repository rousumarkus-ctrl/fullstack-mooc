/* eslint-disable react/prop-types */
import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          todo={todo}
          onClickComplete={completeTodo}
          onClickDelete={deleteTodo}
        ></Todo>
      ))}
    </>
  );
};

export default TodoList;
