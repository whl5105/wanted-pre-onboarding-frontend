import { useReducer } from "react";
import {
  TodosReducer,
  TodosStateContext,
  initialStateTodos,
} from "../reducer/TodosReducer";

interface Props {
  children: React.ReactNode;
}
export default function TodosContextProvider({ children }: Props) {
  const [todosState, dispatch] = useReducer(TodosReducer, initialStateTodos);

  return (
    <TodosStateContext.Provider value={{ todosState, dispatch }}>
      {children}
    </TodosStateContext.Provider>
  );
}
