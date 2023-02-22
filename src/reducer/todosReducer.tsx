import { createContext } from "react";
import { Todo, TodoAction, TodosDispatch } from "../types";

export const initialStateTodos: Array<Todo> = [];
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
export const TodosStateContext = createContext<{
  todosState: Todo[];
  dispatch: TodosDispatch;
}>({ todosState: initialStateTodos, dispatch: () => null });
