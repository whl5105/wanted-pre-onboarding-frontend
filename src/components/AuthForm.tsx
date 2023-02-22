import { useReducer } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../apis/instance";
import { FormReducer, initialStateForm } from "../reducer/FormReducer";
import { User } from "../types";

const Form = styled.form`
  ${({ theme }) => theme.common.Flex_Column};
  margin-top: 30px;
`;
const Input = styled.input`
  width: 100%;
  ${({ theme }) => theme.common.Input};
  margin-bottom: 10px;
`;
const SubmitBtn = styled.button`
  width: 100%;
  padding: 20px 12px;
  background-color: #3f9042;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: 1s;
  margin-top: 20px;
  :hover {
    opacity: 1;
  }
  &:disabled {
    cursor: no-drop;
    opacity: 0.3;
  }
`;
const LinkBtn = styled(Link)`
  margin: 25px 12px;
  color: gray;
  cursor: pointer;
  text-align: center;
  :hover {
    text-decoration: underline;
  }
`;

interface Props {
  type: "signin" | "signup";
}

export default function AuthForm({ type }: Props) {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(FormReducer, initialStateForm);

  //submit
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await instance
      .post<User>(`/auth/${type}`, {
        email: formState.email,
        password: formState.password,
      })
      .then(() => {
        if (type === "signin") navigate("/todo");
        else {
          alert("회원가입 완료!");
          navigate("/signin");
        }
        dispatch({ type: "reset" });
      })
      .catch((error) => {
        alert(error.response.data.message);
        dispatch({ type: "reset" });
      });
  };
  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="email"
        data-testid="email-input"
        placeholder="이메일을 입력해주세요."
        onChange={(e) => dispatch({ type: "email", value: e.target.value })}
        value={formState.email}
      />
      <Input
        type="password"
        data-testid="password-input"
        placeholder="비밀번호를 입력해주세요 (8~20자)"
        onChange={(e) => dispatch({ type: "password", value: e.target.value })}
        value={formState.password}
        autoComplete="off"
      />
      {type === "signin" ? (
        <>
          <SubmitBtn
            type="submit"
            data-testid="signin-button"
            disabled={!(formState.isEmail && formState.isPassword)}
          >
            로그인
          </SubmitBtn>
          <LinkBtn to="/signup"> 회원가입 </LinkBtn>
        </>
      ) : (
        <>
          <SubmitBtn
            type="submit"
            data-testid="signup-button"
            disabled={!(formState.isEmail && formState.isPassword)}
          >
            회원가입
          </SubmitBtn>
          <LinkBtn to="/signin"> 이미 계정이 있으신가요? 로그인 </LinkBtn>
        </>
      )}
    </Form>
  );
}
