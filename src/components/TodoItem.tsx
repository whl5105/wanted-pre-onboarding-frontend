import React, { useState } from "react";
import { instance } from "../apis/instance";
import { Todo } from "../types";
import { useTodosDispatch } from "../reducer/TodosReducer";
import styled, { css } from "styled-components";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
} from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

const Base = styled.li`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;
const Item = styled.div`
  width: 100%;
  ${({ theme }) => theme.common.Flex_Justify_Between};
`;
const Form = styled.form`
  ${({ theme }) => theme.common.Flex_Justify_Between};
  width: 100%;
`;

const CheckBox = styled.label`
  display: flex;
`;
const Input = styled.input`
  width: 80%;
  ${({ theme }) => theme.common.Input};
  line-height: 20px;
`;
const Checkbox = styled.input`
  display: flex;
  min-width: 20px;
`;
const SideBtn = styled.div`
  display: flex;
`;
const Button = styled.button`
  border: none;
  background: none;
  padding: 10px;
`;
const Text = styled.p<{ isCompleted: boolean }>`
  padding-left: 20px;
  max-width: 410px;
  display: flex;
  align-items: center;
  ${(props) =>
    props.isCompleted &&
    css`
      text-decoration: line-through;
    `}
`;

export default function TodoItem(todo: Todo) {
  const dispatch = useTodosDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(todo.todo);
  const [isTodoChange, setIsTodoChange] = useState<boolean>(false);

  //DELETE
  const deleteTodo = async () =>
    await instance
      .delete<Todo>(`/todos/${todo.id}`)
      .then(() => {
        dispatch({
          type: "DELETE",
          id: todo.id,
        });
      })
      .catch((error) => console.log(error));

  //UPDATE : todo
  const updateTodo = async () => {
    return await instance
      .put<Todo>(`/todos/${todo.id}`, {
        todo: value,
        isCompleted: todo.isCompleted,
      })
      .then((res) =>
        dispatch({
          type: "UPDATE",
          data: res,
        })
      )
      .catch((error) => console.log(error));
  };
  //UPDATE : Completed
  const updateCompleted = async () => {
    return await instance
      .put<Todo>(`/todos/${todo.id}`, {
        todo: todo.todo,
        isCompleted: !todo.isCompleted,
      })
      .then((res) =>
        dispatch({
          type: "UPDATE",
          data: res,
        })
      )
      .catch((error) => console.log(error));
  };
  //Submit Form
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTodo();
    setIsEdit(false);
    setIsTodoChange(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    setValue(target);
    target !== todo.todo ? setIsTodoChange(true) : setIsTodoChange(false);
  };
  return (
    <Base>
      {isEdit ? (
        <Item>
          <Form onSubmit={onSubmit}>
            <Input
              data-testid="modify-input"
              type="text"
              onChange={onChange}
              value={value}
            />
            <SideBtn>
              {isTodoChange && (
                <Button data-testid="submit-button" type="submit">
                  <AiOutlineCheck size="20" color="gray" />
                </Button>
              )}

              <Button
                data-testid="cancel-button"
                onClick={() => setIsEdit(false)}
              >
                <AiOutlineClose size="20" color="gray" />
              </Button>
            </SideBtn>
          </Form>
        </Item>
      ) : (
        <Item>
          <CheckBox>
            <Checkbox
              type="checkbox"
              defaultChecked={todo.isCompleted}
              onClick={updateCompleted}
            />
            <Text isCompleted={todo.isCompleted}>{todo.todo}</Text>
          </CheckBox>
          <SideBtn>
            <Button data-testid="modify-button" onClick={() => setIsEdit(true)}>
              <AiOutlineEdit size="20" color="gray" />
            </Button>
            <Button
              data-testid="delete-button"
              type="submit"
              onClick={deleteTodo}
            >
              <AiOutlineDelete size="20" color="gray" />
            </Button>
          </SideBtn>
        </Item>
      )}
    </Base>
  );
}
