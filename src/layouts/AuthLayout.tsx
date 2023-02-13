import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Base = styled.div`
  margin-top: 100px;
`;
export default function AuthLayout() {
  return (
    <Base>
      <Outlet />
    </Base>
  );
}
