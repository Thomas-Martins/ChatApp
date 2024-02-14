import { useEffect, useRef, useState } from "react";
import { TiUserAddOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { getAllFriends } from "../utils/friendUtils";
import UserModal from "./modal/UserModal";

export default function Sidebar() {
  const { userData, token, setUserData, setToken } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    getAllFriends(token, setFriendList);
    getAllConversations(token);
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [token]);

  // Function for getting the first letter of the username
  const getInitials = (username) => {
    if (!username) return "";
    const words = username.split(" ");
    const initials = words.map((word) => word.charAt(0)).join("");
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

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowMessageModal(false);
    }
  };

  const handleFriendSelection = (friendId) => {
    setSelectedFriendId(friendId);
  };

  const createConversation = async (event) => {
    event.preventDefault();
    console.log("friend", selectedFriendId);
    console.log("user", userData.id);
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/conversations/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      body: JSON.stringify({
        user_1: userData.id,
        user_2: selectedFriendId,
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    window.location.reload();
  };

  const getAllConversations = async () => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/conversations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Réponse réseau incorrecte");
        }
        return response.json();
      })
      .then((data) => {
        setConversations(data);
        console.log(data);
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
          <div className="flex justify-between items-center relative">
            <p className="text-gray-500 text-sm">MESSAGES</p>
            <button onClick={() => setShowMessageModal(!showMessageModal)}>
              <span className="text-gray-500 hover:text-white">+</span>
            </button>
            {showMessageModal && (
              <div
                ref={modalRef}
                className="absolute z-50 -left-6 translate-x-1/2 top-10 bg-gray-700 text-white border-[1px] border-gray-800 rounded-lg shadow-2xl p-4"
              >
                <div className="relative w-[350px] h-[350px] rounded-lg">
                  {/*content*/}
                  <div className="">
                    <div>
                      <h1 className="font-semibold px-3 mb-3">
                        Choisis une personne avec qui parler.
                      </h1>
                    </div>
                    {Array.isArray(friendList) && friendList.length > 0 ? (
                      <fieldset className="space-y-4">
                        <legend className="sr-only">Friends</legend>
                        {friendList.map((friends) => {
                          // Vérifier si l'utilisateur connecté est le sender ou le receiver
                          const friend =
                            friends.sender.id !== userData.id
                              ? friends.sender
                              : friends.receiver;
                          return (
                            <div
                              key={friend.id}
                              className="flex justify-between items-center hover:bg-gray-600 px-3 rounded-lg transition-all cursor-pointer"
                            >
                              <label
                                htmlFor={`friendCheckbox_${friend.id}`}
                                className="flex items-center w-full"
                              >
                                <div className="flex items-center w-full py-3 gap-3">
                                  <div className="grid h-12 w-14 place-content-center rounded-full border-white bg-indigo-400">
                                    <img
                                      src="../src/assets/images/logo/logo.png"
                                      alt="Profile"
                                    />
                                  </div>
                                  <div className="w-full">
                                    <p className="text-white font-semibold">
                                      {friend.username}
                                    </p>
                                  </div>
                                </div>
                                <input
                                  type="radio"
                                  id={`friendCheckbox_${friend.id}`}
                                  name="selectedFriend"
                                  className="size-5 border-gray-300 checked:accent-indigo-500"
                                  value={friend.id}
                                  checked={selectedFriendId === friend.id}
                                  onChange={() =>
                                    handleFriendSelection(friend.id)
                                  }
                                />
                              </label>
                            </div>
                          );
                        })}
                      </fieldset>
                    ) : (
                      <div>
                        <p className="text-gray-400">
                          Tu n&apos;as pas encore d&apos;amis.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-indigo-500 p-3 text-center rounded-lg shadow-lg hover:bg-indigo-600 duration-300">
                  <button onClick={createConversation}>Créer un MP</button>
                </div>
              </div>
            )}
          </div>
          {/* Lists of Conversation */}
          {conversations && conversations.length > 0 ? (
            conversations.map((conversation) => (
              <div className="mt-3 space-y-1" key={conversation.id}>
                <Link
                  to={`/conversation/${
                    conversation.user1_info.id === userData.id
                      ? conversation.user2_info.username
                      : conversation.user1_info.username
                  }`}
                  state={{ conversationId: conversation.id }}
                  className="flex items-center text-sm font-medium text-gray-200 "
                >
                  <span className="grid h-10 w-10 justify-center items-center rounded-lg bg-indigo-400 text-xl text-white font-semibold">
                    C1
                  </span>
                  {conversation.user1_info.id === userData.id ? (
                    <div className="ml-3 font-semibold">
                      {conversation.user2_info.username}
                    </div>
                  ) : (
                    <div className="ml-3 font-semibold">
                      {conversation.user1_info.username}
                    </div>
                  )}
                </Link>
              </div>
            ))
          ) : (
            <div className=" text-white mt-3">Aucune Conversations</div>
          )}
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
      {showModal && (
        <UserModal
          user={userData}
          setShowModal={setShowModal}
          modalRef={modalRef}
        />
      )}
    </div>
  );
}
