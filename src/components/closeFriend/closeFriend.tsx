import { FC } from "react";
import { IUserItem } from "../../dummyData";
import "./closeFriend.css";

interface ICloseFriendProps {
    user:IUserItem
}

export const CloseFriend:FC<ICloseFriendProps> = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER as string
  return (
    <li className="sidebarFriend">
      <img src={PF+user.profilePicture} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};
