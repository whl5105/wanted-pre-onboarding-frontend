import React, { useState } from "react";
import { instance } from "../apis/instance";
import { Todo } from "../types";
import { useTodosDispatch } from "../reducer/todosReducer";
import styled from "styled-components";

const Base = styled.div`
  margin: 10px 0;
`;
const Form = styled.form`
  ${({ theme }) => theme.common.Flex_Justify_Between};
  width: 100%;
  margin-top: 30px;
`;
const Input = styled.input`
  width: 80%;
  ${({ theme }) => theme.common.Input};
`;
const SubmitBtn = styled.button`
  width: 100px;
  height: 77px;
  background-color: #3f9042;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 4px;
`;
export default function TodoCreate() {
  const dispatch = useTodosDispatch();
  const [todo, setTodo] = useState<string>("");

  const createTodo = async () =>
    await instance
      .post<Todo>(`/todos`, { todo })
      .then((res) => {
        dispatch({
          type: "CREATE",
          data: res,
        });
        setTodo("");
      })
      .catch((error) => console.log(error));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTodo();
  };

  return (
    <Base>
      <Form onSubmit={onSubmit}>
        <Input
          data-testid="new-todo-input"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          placeholder="할일을 입력해주세요."
        />
        <SubmitBtn data-testid="new-todo-add-button" type="submit">
          추가
        </SubmitBtn>
      </Form>
    </Base>
  );
}
