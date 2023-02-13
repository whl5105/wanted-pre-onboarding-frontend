import { FormAction, InputForm } from "../types";

export const initialStateForm: InputForm = {
  email: "",
  password: "",
  isEmail: false,
  isPassword: false,
};

const regEmail: RegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const regPassword: RegExp = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,20}$/;

const emailCheck = (email: string): boolean => regEmail.test(email);
const PasswordCheck = (password: string): boolean => regPassword.test(password);

export function formReducer(state: InputForm, action: FormAction): InputForm {
  switch (action.type) {
    case "email":
      return emailCheck(action.value)
        ? {
            ...state,
            [action.type]: action.value,
            isEmail: true,
          }
        : {
            ...state,
            [action.type]: action.value,
            isEmail: false,
          };

    case "password":
      return PasswordCheck(action.value)
        ? {
            ...state,
            [action.type]: action.value,
            isPassword: true,
          }
        : {
            ...state,
            [action.type]: action.value,
            isPassword: false,
          };
    case "reset":
      return initialStateForm;
    default:
      return state;
  }
}
