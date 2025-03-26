import { FC } from "react"
import { IUserItem } from "../../dummyData"
import "./online.css"

interface IOnlineProps {
    user:IUserItem
}

export const Online:FC<IOnlineProps> = ({user}) => {
    return(
        <li className="rightBarFriend">
        <div className="rightBarProfileImgContainer">
          <img
            src={user.profilePicture}
            alt=""
            className="rightBarProfileImg"
          />
          <span className="rightBarOnline"></span>
        </div>
        <span className="rightBarUserName">{user.username}</span>
      </li>
    )

}