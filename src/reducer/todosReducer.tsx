import { createContext, useContext } from "react";
import { Todo, TodoAction, TodosDispatch } from "../types";

//reducer
export function TodosReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "READ":
      return (state = action.data);
    case "CREATE":
      return state.concat(action.data);
    case "UPDATE":
      return state.map((data) =>
        data.id === action.data.id
          ? {
              ...data,
              todo: action.data.todo,
              isCompleted: action.data.isCompleted,
            }
          : data
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error("Unhandled action");
  }
}

//context
export const TodosStateContext = createContext<Todo[] | undefined>(undefined);
export const TodosDispatchContext = createContext<TodosDispatch | undefined>(
  undefined
);

//state_context
export function useTodosState() {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error("TodosProvider error");
  return state;
}
//dispatch_context
export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error("TodosProvider error");
  return dispatch;
}
