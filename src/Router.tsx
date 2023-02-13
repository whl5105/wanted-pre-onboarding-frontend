import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  redirect,
} from "react-router-dom";
//layout and pages
import AuthLayout from "./layouts/AuthLayout";
import App from "./layouts/App";
import Todo from "./pages/Todo";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const isCheckAuth = (): boolean =>
  localStorage.getItem("accessToken") ? true : false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate replace to="todo" />} />
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route
        path="todo"
        element={<Todo />}
        loader={async () => {
          const isToken = isCheckAuth();
          if (!isToken) throw redirect("/signin");
          return { isToken };
        }}
      />
      <Route
        element={<AuthLayout />}
        loader={async () => {
          const isToken = isCheckAuth();
          if (isToken) throw redirect("/todo");
          return { isToken };
        }}
      >
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Route>
  )
);
export default router;
