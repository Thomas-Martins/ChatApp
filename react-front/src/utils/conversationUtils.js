export const createConversation = async (token, userData, selectedFriendId) => {
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
