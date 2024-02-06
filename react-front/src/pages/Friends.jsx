import { useEffect, useState } from "react";
import { TbDotsVertical, TbMessageCircle2Filled } from "react-icons/tb";
import { useAuth } from "../contexts/AuthProvider";

export default function Friends() {
  const { userData, token } = useAuth();
  const [receiveRequest, setReceiveRequest] = useState([]);
  const [sendRequest, setSendRequest] = useState([]);
  const [inputUsername, setInputUsername] = useState("");
  const [friendRequestMessage, setFriendRequestMessage] = useState("");
  const [allFriendsList, setAllFriendsList] = useState([]);

  useEffect(() => {
    fetchFriendsSendRequest(token);
    fetchFriendsReceiveRequest(token);
    getAllFriends();
  }, [token]);

  const inputChange = (event) => {
    event.preventDefault();
    const username = event.target.value;
    setInputUsername(username);
  };

  const fetchFriendsSendRequest = (token) => {
    fetch("http://localhost:8000/api/friends-request", {
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
        setSendRequest(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchFriendsReceiveRequest = () => {
    fetch("http://localhost:8000/api/friends-request-received", {
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
        setReceiveRequest(data);
      })
      .catch((error) => console.log(error));
  };

  // Fonction pour formater la différence de temps sans moment
  const formatTimeDifference = (createdAt) => {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const differenceInMilliseconds = now - createdAtDate;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    if (differenceInDays >= 1) {
      return `${differenceInDays} jour${differenceInDays > 1 ? "s" : ""}`;
    } else if (differenceInHours >= 1) {
      return `${differenceInHours} heure${differenceInHours > 1 ? "s" : ""}`;
    } else {
      return `${differenceInMinutes} minute${
        differenceInMinutes > 1 ? "s" : ""
      }`;
    }
  };

  const addFriend = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/api/friends-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      body: JSON.stringify({
        username: inputUsername,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Réponse réseau incorrecte");
        }
        return response.json();
      })
      .then((data) => {
        setFriendRequestMessage(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const acceptFriend = async (requestId) => {
    // console.log("Accept friend");
    await fetch(
      `http://localhost:8000/api/friends-request/${requestId}/accept`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Réponse réseau incorrecte");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    window.location.reload();
  };

  const rejectFriend = async (requestId) => {
    await fetch(
      `http://localhost:8000/api/friends-request/${requestId}/rejected`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Réponse réseau incorrecte");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    window.location.reload();
  };

  const getAllFriends = () => {
    fetch("http://localhost:8000/api/friends", {
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
        setAllFriendsList(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="text-white p-4">
      {/* Input for adding a friend */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">AJOUTER</h1>
        <p className="text-gray-400">
          Tu peux ajouter des amis grâce à leur nom d'utilisateur.
        </p>
      </div>
      <div className="flex">
        <div className="w-full mr-6">
          <label
            htmlFor="username"
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              id="username"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3"
              placeholder="Username"
              onChange={inputChange}
            />

            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-700 p-1.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-sm peer-focus:text-white">
              Username
            </span>
          </label>
        </div>
        <button
          onClick={addFriend}
          className="bg-emerald-500 py-2 px-5 rounded"
        >
          Ajouter
        </button>
      </div>
      <div>
        {friendRequestMessage && (
          <p className="text-gray-200 mt-2">{friendRequestMessage.message}</p>
        )}
      </div>

      {/* Block for friends request */}
      <div className="mt-5">
        <h1 className="mb-3">Demandes en attente</h1>
        <div className="">
          {!Array.isArray(receiveRequest) ? (
            <p className="text-gray-400">{receiveRequest.message}</p>
          ) : (
            <div>
              {/* Afficher les demandes en attente */}
              {Array.isArray(receiveRequest) &&
                receiveRequest.map((request) => (
                  <div
                    key={request.id}
                    className="flex justify-between items-center mb-4"
                  >
                    <div className="flex items-center">
                      <div className="grid h-14 w-14 place-content-center rounded-lg border-2 border-white bg-indigo-400">
                        <img
                          src="../src/assets/images/logo/logo.png"
                          alt="Profile"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-white font-semibold">
                          {request.sender.username}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Envoyé il y a{" "}
                          {formatTimeDifference(request.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => acceptFriend(request.id)}
                        className="bg-emerald-600 py-2 px-5 rounded mr-2"
                      >
                        Accepter
                      </button>
                      <button
                        onClick={rejectFriend}
                        className="bg-red-600 py-2 px-5 rounded"
                      >
                        Refuser
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Block for pending request  */}
      <div className="mt-6">
        <h1 className="mb-3">Demandes envoyées</h1>
        {!Array.isArray(sendRequest) ? (
          <p className="text-gray-400">{sendRequest.message}</p>
        ) : (
          <div>
            {Array.isArray(sendRequest) &&
              sendRequest.map((request) => (
                <div
                  key={request.id}
                  className="flex justify-between items-center mb-4"
                >
                  <div className="flex items-center">
                    <div className="grid h-14 w-14 place-content-center rounded-lg border-2 border-white bg-indigo-400">
                      <img
                        src="../src/assets/images/logo/logo.png"
                        alt="Profile"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-semibold">
                        {request.receiver.username}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Envoyé il y a {formatTimeDifference(request.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* All friends */}
      <div>
        <h1 className="mb-3">Amis</h1>
        {Array.isArray(allFriendsList) && allFriendsList.length > 0 ? (
          <div className="">
            {allFriendsList.map((friendship) => {
              // Vérifier si l'utilisateur connecté est le sender ou le receiver
              const friend =
                friendship.sender.id !== userData.id
                  ? friendship.sender
                  : friendship.receiver;
              return (
                <div
                  key={friend.id}
                  className="flex justify-between items-center hover:bg-gray-600 px-3 rounded-lg transition-all cursor-pointer"
                >
                  <div className="flex items-center w-full py-3 border-t-[1px] border-gray-600 ">
                    <div className="grid h-14 w-14 place-content-center rounded-lg border-2 border-white bg-indigo-400">
                      <img
                        src="../src/assets/images/logo/logo.png"
                        alt="Profile"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-semibold">
                        {friend.username}
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-5">
                    <div className="group bg-slate-800 hover:bg-slate-900 rounded-full p-2 relative">
                      <p className="opacity-0 group-hover:opacity-100 absolute bg-black text-center p-2 rounded-lg w-[140px] -top-12 -translate-x-[40%] transition-opacity duration-300">
                        Envoyer un MP
                      </p>
                      <TbMessageCircle2Filled size={25} />
                    </div>
                    <div className="group bg-slate-800 hover:bg-slate-900 rounded-full p-2 ">
                      <p className="opacity-0 group-hover:opacity-100 absolute bg-black text-center p-2 rounded-lg -top-12 -translate-x-1/4 transition-opacity duration-300">
                        Plus
                      </p>
                      <TbDotsVertical size={25} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <p className="text-gray-400">
              Tu n&apos;as pas encore d&apos;amis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
