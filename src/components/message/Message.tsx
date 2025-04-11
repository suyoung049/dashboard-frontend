import { FC, useEffect, useState } from "react";
import { format } from "timeago.js";
import "./message.css";
import { IMessage } from "../../pages/messenger/Messenger";
import { IUserItemResponse } from "../../dummyData";
import axios from "axios";
interface IMessageProps {
  message: IMessage;
  own?: boolean;
}
export const Message: FC<IMessageProps> = ({ own, message }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER as string;
  const [user, setUser] = useState<IUserItemResponse>();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/?userId=${message.sender}`);
        setUser(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    getUser();
  }, [message]);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={PF + user?.profilePicture} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};
