//Methods to get all friend requests send
export const fetchFriendsSendRequest = (token, setData) => {
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
      setData(data);
    })
    .catch((error) => console.log(error));
};

//Methods to get all friend requests received
export const fetchFriendsReceiveRequest = (token, setData) => {
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
      setData(data);
    })
    .catch((error) => console.log(error));
};

//Méthods to get all friends
export const getAllFriends = (token, setAllFriendsList) => {
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

//Methods for adding a friend
export const addFriend = (token, username, setData) => {
  fetch("http://localhost:8000/api/friends-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau incorrecte");
      }
      return response.json();
    })
    .then((data) => {
      setData(data);
    })
    .catch((error) => {
      console.log(error.message);
    });

  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

//Methods for accepting a friend request
export const acceptFriend = async (requestId, token) => {
  await fetch(`http://localhost:8000/api/friends-request/${requestId}/accept`, {
    method: "POST",
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
      console.log(data);
    })
    .catch((error) => {
      console.log(error.message);
    });

  window.location.reload();
};

//Methods for rejecting a friend request
export const rejectFriend = async (requestId, token) => {
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
