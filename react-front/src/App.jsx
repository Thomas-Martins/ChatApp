import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./contexts/AuthProvider";

function App() {
    const { userData } = useAuth();

    if (!userData) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="content bg-gray-700 w-full">
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default App;
