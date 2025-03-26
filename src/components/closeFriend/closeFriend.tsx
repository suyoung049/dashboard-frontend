import { FC } from "react";
import { IUserItem } from "../../dummyData";
import "./closeFriend.css";

interface ICloseFriendProps {
    user:IUserItem
}

export const CloseFriend:FC<ICloseFriendProps> = ({user}) => {
  return (
    <li className="sidebarFriend">
      <img src={user.profilePicture} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};
