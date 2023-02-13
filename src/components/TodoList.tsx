import { useEffect } from "react";
import { instance } from "../apis/instance";
import { Todo } from "../types";
import TodoItem from "./TodoItem";
import { useTodosDispatch, useTodosState } from "../reducer/todosReducer";
import styled from "styled-components";

const Base = styled.div`
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  max-height: calc(100vh - 300px);
`;

export default function TodoList() {
  const todos = useTodosState();
  const dispatch = useTodosDispatch();

  const readTodos = async () =>
    await instance
      .get<Todo[]>(`/todos`)
      .then((res) =>
        dispatch({
          type: "READ",
          data: res,
        })
      )
      .catch((error) => console.log(error));

  useEffect(() => {
    readTodos();
  }, []);

  return (
    <Base>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          todo={todo.todo}
          isCompleted={todo.isCompleted}
          userId={todo.userId}
        />
      ))}
    </Base>
  );
}
