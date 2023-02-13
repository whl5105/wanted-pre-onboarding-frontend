import styled from "styled-components";
import AuthForm from "../components/AuthForm";

const Title = styled.h1`
  ${({ theme }) => theme.common.Title};
`;

export default function Signin() {
  return (
    <>
      <Title>로그인</Title>
      <AuthForm type="signin" />
    </>
  );
}
