import { FC, useContext, useEffect, useState } from "react";
import "./chatOnline.css";
import { AuthContext } from "../../context/AuthContext";
import { IConversation } from "../../pages/messenger/Messenger";
import { IFriendResponse } from "../rightbar/rightbar";
import axios from "axios";

interface IOnlineProps {
  onlineUsers: any;
  setCurrentChat: React.Dispatch<
    React.SetStateAction<IConversation | undefined>
  >;
}

export const ChatOnline: FC<IOnlineProps> = ({
  onlineUsers,
  setCurrentChat,
}) => {
  const { user: currentUser } = useContext(AuthContext);
  const [friends, setFriends] = useState<IFriendResponse[]>([]);
  const [onlineFriends, setOnlineFriends] = useState<IFriendResponse[]>([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER as string;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `/users/friends/${currentUser?._id}`
        );
        setFriends(friendList.data);
      } catch (e) {
        console.error(e);
      }
    };
    getFriends();
  }, [currentUser?._id]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user:IFriendResponse) => {
    try {
      const res = await axios.get(`/conversation/find/${currentUser?._id}/${user._id}`)
      setCurrentChat(res.data)
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" key={o._id} onClick={() => {handleClick(o)}}>
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={PF + o.profilePicture} alt="" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.userName}</span>
        </div>
      ))}
    </div>
  );
};
