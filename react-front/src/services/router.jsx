import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddUsers from "../pages/AddUsers";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [{ path: "/add-users", element: <AddUsers /> }],
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
