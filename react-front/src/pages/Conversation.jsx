import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function Conversation() {
  const { userData, token } = useAuth();
  const [messagesToDisplay, setMessagesToDisplay] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const inputMessageRef = useRef();
  const messagesContainerRef = useRef(null);
  const location = useLocation();
  const [conversationInfo, setConversationInfo] = useState(null);
  const channelRef = useRef(null);

  useEffect(() => {
    // Pusher.logToConsole = true;
    const pusher = new Pusher("7cb7ce763cf21758a85f", {
      cluster: "eu",
    });
    channelRef.current = pusher.subscribe("message-channel");

    handleEvent();

    return () => {
      channelRef.current.unbind(); // Unbind event listeners on cleanup
    };
  }, []);

  useEffect(() => {
    if (location.state && location.state.conversationId) {
      fetchConversationInfo(location.state.conversationId);
    }
  }, [location, token]);

  useEffect(() => {
    if (conversationInfo) {
      fetchMessages(conversationInfo.id);
    }
  }, [conversationInfo]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messagesToDisplay]);

  const fetchConversationInfo = async (conversationId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/conversation/${conversationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setConversationInfo(data);
      } else {
        console.error("Error fetching conversation info:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchMessages = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/messages/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMessagesToDisplay(data);
      } else {
        console.error("Error fetching messages:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendMessage = async () => {
    try {
      let received_by = "";

      if (userData.id === conversationInfo.user1_info.id) {
        received_by = conversationInfo.user2_info.id;
      } else {
        received_by = conversationInfo.user1_info.id;
      }

      const payload = {
        content: inputMessageRef.current.value,
        send_by: userData.id,
        received_by: received_by,
        conversation_id: conversationInfo.id,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Message envoyé");
        setInputMessage(""); // Effacer le contenu de l'input après l'envoi du message
        const data = await response.json();
        setMessagesToDisplay([...messagesToDisplay, data]); // Ajouter le nouveau message à l'état local
      } else {
        console.error("Error sending message:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const handleEvent = () => {
    channelRef.current.bind("message-event", function (data) {
      console.log("EventData", data);

      if (data && data.data && data.data.content) {
        const newMessage = data.data;
        console.log("New Message:", newMessage); // Vérifiez le contenu du nouveau message

        setMessagesToDisplay((prevMessages) => [...prevMessages, newMessage]);
      } else {
        console.error("Invalid data structure:", data);
      }
    });
  };

  return (
    <div className="h-full relative overflow-hidden">
      {/* title */}
      <div className="shadow-md border-b-[1px] border-gray-800 p-3">
        {conversationInfo && (
          <h1 className="text-white font-semibold text-3xl">
            {conversationInfo.user1_info.id === userData.id
              ? conversationInfo.user2_info.username
              : conversationInfo.user1_info.username}
          </h1>
        )}
      </div>
      {/* Container of Messages */}
      <div
        ref={messagesContainerRef}
        className="
        absolute
        bottom-20
        left-0
        w-full
        max-h-[calc(100vh-141px)]   
        overflow-y-auto             
        scrollbar-thin
        scrollbar-thumb-rounded-full 
        scrollbar-track-rounded-full
        scrollbar-thumb-gray-900 
        scrollbar-track-gray-600
        scrollbar-w-8
        px-4
      "
      >
        {messagesToDisplay.map((message, index) => {
          const isCurrentUser = message.send_by === userData.id;
          return (
            <div
              className={`flex  ${
                isCurrentUser ? "justify-end" : "justify-start"
              } `}
              key={index}
            >
              <div className="p-2">
                <p className="bg-gray-900 text-white rounded-lg p-3">
                  {message.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Input Message */}
      <div className="text-white absolute bottom-0 left-0 w-full px-4 py-3">
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            ref={inputMessageRef}
            className="w-full p-4 bg-gray-900 rounded-lg"
            onKeyDown={handleKeyDown}
          />
          <div>
            <button
              onClick={sendMessage}
              className="bg-indigo-500 rounded-full p-3"
            >
              <IoIosSend size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
