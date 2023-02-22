import TodoCreate from "../components/TodoCreate";
import TodoList from "../components/TodoList";
import TodosContextProvider from "../components/TodosContextProvider";
import styled from "styled-components";

const Base = styled.div``;
const Title = styled.h1`
  ${({ theme }) => theme.common.Title};
`;

export default function TodoPage() {
  return (
    <TodosContextProvider>
      <Base>
        <Title>Todo List</Title>
        <TodoCreate />
        <TodoList />
      </Base>
    </TodosContextProvider>
  );
}
