import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/output.css";
import { RouterProvider } from "react-router-dom";
import router from "./services/router.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
