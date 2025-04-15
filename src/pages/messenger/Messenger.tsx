import { useContext, useEffect, useRef, useState } from "react";
import { ChatOnline } from "../../components/chatOnline/ChatOnline";
import { Conversation } from "../../components/conversations/Conversation";
import { Message } from "../../components/message/Message";
import { Topbar } from "../../components/topbar/Topbar";
import "./messenger.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io, Socket } from "socket.io-client";

export interface IConversation {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  _id?: string;
  conversationId?: string;
  sender: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
}

export const Messenger = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [currentChat, setCurrentChat] = useState<IConversation>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [arrivalMessage, setArrivalMessage] = useState<IMessage | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const newSocket = io("ws://localhost:8800");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [currentChat]);

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", user?._id);
  
      const handleGetUsers = (users: any) => {
        const onlineFollowings = user?.followings?.filter((f) =>
          users.some((u: any) => u.userId === f)
        );
        setOnlineUsers(onlineFollowings as any);
      };
  
      const handleGetMessage = (data: any) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: new Date().toISOString(),
        });
      };
  
      socket.on("getUsers", handleGetUsers);
      socket.on("getMessage", handleGetMessage);
  
      // ✅ 클린업
      return () => {
        socket.off("getUsers", handleGetUsers);
        socket.off("getMessage", handleGetMessage);
      };
    }
  }, [socket, user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversation/${user?._id}`);
        setConversations(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/message/${currentChat?._id}`);
        setMessages(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    if (currentChat?._id) {
      getMessages();
    }
  }, [currentChat]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat?.members.find(
      (member) => member !== user?._id
    );

    socket?.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/message", message);
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} />
              </div>
            ))}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((m, idx) => (
                    <div ref={scrollRef} key={idx}>
                      <Message message={m} own={m.sender === user?._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button onClick={handleSubmit} className="chatSubmitButton">
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};
