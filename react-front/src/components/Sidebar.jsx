import { useState } from "react";
import { TiUserAddOutline } from "react-icons/ti";
import { useAuth } from "../contexts/AuthProvider";
import UserModal from "./modal/UserModal";

export default function Sidebar() {
  const { userData, token, setUserData, setToken } = useAuth();
  const [showModal, setShowModal] = useState(false);

  // Function for getting the first letter of the username
  const getInitials = (username) => {
    // check if username is not empty
    if (!username) return "";

    // Split the username into words
    const words = username.split(" ");

    // Get the first letter of each word and join them
    const initials = words.map((word) => word.charAt(0)).join("");

    // Make sure the initials are uppercase
    return initials.toUpperCase();
  };

  const onLogout = async (e) => {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      body: JSON.stringify(),
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
        setToken(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="flex h-screen min-w-52 w-52 flex-col justify-between bg-gray-800">
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-10">
          <span className="grid h-14 w-1/2 place-content-center rounded-lg border-2 border-white bg-indigo-400">
            <img src="../src/assets/images/logo/logo.png" />
          </span>
          <a href="/add-users">
            <TiUserAddOutline size={25} color="white" />
          </a>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">MESSAGES</p>
            <a href="">
              <span className="text-gray-500 hover:text-white">+</span>
            </a>
          </div>
          <ul className="mt-3 space-y-1">
            <li className="inline-flex w-full justify-start items-center mb-2">
              <a
                href=""
                className="flex items-center text-sm font-medium text-gray-200 "
              >
                <span className="grid h-10 w-10 justify-center items-center rounded-lg bg-indigo-400 text-xl text-white font-semibold">
                  C1
                </span>
                <div className="ml-3 font-semibold">Conversation 1</div>
              </a>
            </li>
            <li className="inline-flex w-full justify-start items-center mb-2">
              <a
                href=""
                className="flex items-center text-sm font-medium text-gray-200 "
              >
                <span className="grid h-10 w-10 justify-center items-center rounded-lg bg-indigo-400 text-xl text-white font-semibold">
                  C2
                </span>
                <div className="ml-3 font-semibold">Conversation 2</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* User info */}
      <div className="flex items-center sticky inset-x-0 bottom-0 border-t border-gray-600">
        <button
          onClick={() => setShowModal(!showModal)}
          className="flex items-center gap-2 bg-gray-800 p-4 hover:bg-gray-700"
        >
          <span className="grid h-10 w-10 justify-center items-center rounded-lg bg-indigo-400 text-xl text-white font-semibold">
            {getInitials(userData.username)}
          </span>
          <div>
            <p className="text-xs text-gray-200">
              <strong className="block font-medium">{userData.username}</strong>
            </p>
          </div>
        </button>
        <button
          onClick={onLogout}
          className="group relative flex w-full h-full justify-center items-center px-2 py-1.5 text-white hover:bg-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible">
            Logout
          </span>
        </button>
      </div>
      {showModal && <UserModal user={userData} setShowModal={setShowModal} />}
    </div>
  );
}
