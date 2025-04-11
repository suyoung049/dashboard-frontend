import { FC, useContext, useEffect, useState } from "react";
import { IConversation } from "../../pages/messenger/Messenger";
import "./Conversation.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { IUserItemResponse } from "../../dummyData";

interface IConversationProps {
  conversation: IConversation;
}

export const Conversation: FC<IConversationProps> = ({ conversation }) => {
  const [user, setUser] = useState<IUserItemResponse>();
  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser?._id);
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/?userId=${friendId}`);
        setUser(res.data)
      } catch (e) {
        console.error(e);
      }
    };

    getUser();
  }, [conversation]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER as string;
  return (
    <>
      <div className="conversation">
        <img className="conversationImg" src={PF + user?.profilePicture} alt="" />
        <span className="conversationName">{user?.userName}</span>
      </div>
    </>
  );
};
