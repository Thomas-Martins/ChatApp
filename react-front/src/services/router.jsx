import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import EditUser from "../components/modal/EditUser";
import Conversation from "../pages/Conversation";
import Friends from "../pages/Friends";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/add-users",
        element: <Friends />,
      },
      {
        path: "/edit-user",
        element: <EditUser />,
      },
      {
        path: "/conversation/:id",
        element: <Conversation />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default router;
