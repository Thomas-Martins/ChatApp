import { useEffect } from "react";
import { useAuth } from "./contexts/AuthProvider";
import { Navigate } from "react-router-dom";
function App() {
    const { userData, token, setUserData, setToken } = useAuth();

    useEffect(() => {
        console.log(userData.username);
    }, []);

    if (!userData) {
        return <Navigate to="/login" />;
    }

    const onLogout = async (e) => {
        e.preventDefault();

        await fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
          mode: "cors",
          body: JSON.stringify()
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Réponse réseau incorrecte");
              }
              return response.json();
          })
          .then((data) => {
              console.log(data);
              setUserData(null);
              setToken(null)
          })
          .catch((error) => {
              console.error(error);
          });
    };

    return (
        <div>
            <header>
                <nav>
                    <div>{userData.username}</div>
                    <div>
                        <button
                            onClick={onLogout}
                            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Deconnexion
                        </button>
                    </div>
                </nav>
            </header>
            Hello World
        </div>
    );
}

export default App;
