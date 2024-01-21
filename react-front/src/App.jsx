import Sidebar from "./components/Sidebar";
import { useAuth } from "./contexts/AuthProvider";
import { Navigate } from "react-router-dom";

function App() {
    const { userData } = useAuth();

    if (!userData) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex">
            <Sidebar/>
            <div className="content bg-gray-700 w-full">

                <div className="p-4">
                    <p className="text-white">Hello World</p>
                </div>
            </div>
        </div>
    );
}

export default App;
