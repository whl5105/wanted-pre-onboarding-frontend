import { Dispatch } from "react";

//signin signup
export interface User {
  email: string;
  password: string;
}
//signin signup (input)
export interface InputForm extends User {
  isEmail: boolean;
  isPassword: boolean;
}
//todo
export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
//todo reducer
export type TodoAction =
  | {
      type: "READ";
      data: Todo[];
    }
  | {
      type: "CREATE";
      data: Todo;
    }
  | { type: "UPDATE"; data: Todo }
  | { type: "DELETE"; id: number };

export type TodosDispatch = Dispatch<TodoAction>;

////signin signup(input reducer)
export type FormAction =
  | {
      type: "email";
      value: string;
    }
  | {
      type: "password";
      value: string;
    }
  | {
      value?: string;
      type: "reset";
    };
