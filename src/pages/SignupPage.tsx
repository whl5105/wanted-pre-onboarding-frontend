import styled from "styled-components";
import AuthForm from "../components/AuthForm";

const Title = styled.h1`
  ${({ theme }) => theme.common.Title};
`;

export default function SignupPage() {
  return (
    <>
      <Title>회원가입</Title>
      <AuthForm type="signup" />
    </>
  );
}
