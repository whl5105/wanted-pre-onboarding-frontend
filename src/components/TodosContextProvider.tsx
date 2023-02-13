import { useReducer } from "react";
import {
  TodosDispatchContext,
  todosReducer,
  TodosStateContext,
} from "../reducer/todosReducer";
import { Todo } from "../types";

interface Props {
  children: React.ReactNode;
}
export default function TodosContextProvider({ children }: Props) {
  const initialStateTodos: Array<Todo> = [];
  const [todosState, dispatch] = useReducer(todosReducer, initialStateTodos);

  return (
    <TodosStateContext.Provider value={todosState}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosStateContext.Provider>
  );
}