import { FC } from "react";
import { IUserItem } from "../../dummyData";
import "./online.css";

interface IOnlineProps {
  user: IUserItem;
}

export const Online: FC<IOnlineProps> = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER as string;
  return (
    <li className="rightBarFriend">
      <div className="rightBarProfileImgContainer">
        <img src={PF+user.profilePicture} alt="" className="rightBarProfileImg" />
        <span className="rightBarOnline"></span>
      </div>
      <span className="rightBarUserName">{user.username}</span>
    </li>
  );
};
