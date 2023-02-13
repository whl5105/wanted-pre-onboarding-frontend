import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../style/theme";

const LayoutWrap = styled.section`
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  background-color: antiquewhite;
`;
const Base = styled.div`
  ${({ theme }) => theme.common.Flex_Column};
  width: 600px;
  height: 100vh;
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px;
  background-color: #fbfbfb;
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LayoutWrap>
        <Base>
          <Outlet />
        </Base>
      </LayoutWrap>
    </ThemeProvider>
  );
}
