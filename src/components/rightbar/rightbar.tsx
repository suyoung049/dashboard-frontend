import "./rightbar.css";
import { IUserItemResponse, Users } from "../../dummyData";
import { Online } from "../online/online";
import { FC } from "react";

interface IRightBarProps {
  user?: IUserItemResponse;
}

export const RightBar: FC<IRightBarProps> = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER as string;
  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img src={`${PF}ad.png`} alt="" className="rightBarAd" />
        <h4 className="rightBarTitle">Online Friends</h4>
        <ul className="rightBarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        <h4 className="rightBarTitle">User Information</h4>
        <div className="rightBarInfo">
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">City:</span>
            <span className="rightBarInfoValue">{user?.city}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">From:</span>
            <span className="rightBarInfoValue">{user?.from}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">Relationship:</span>
            <span className="rightBarInfoValue">
              {user?.relationship === 1
                ? "Single"
                : user?.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightBarTitle">User Friends</h4>
        <div className="rightBarFollowings">
          <div className="rightBarFollowingItem">
            <img
              src={`${PF}person/1.jpeg`}
              alt=""
              className="rightBarFollowingImg"
            />
            <span className="rightBarFollowingName">John Carter</span>
          </div>
          <div className="rightBarFollowingItem">
            <img
              src={`${PF}person/5.jpeg`}
              alt=""
              className="rightBarFollowingImg"
            />
            <span className="rightBarFollowingName">John Carter</span>
          </div>
          <div className="rightBarFollowingItem">
            <img
              src={`${PF}person/2.jpeg`}
              alt=""
              className="rightBarFollowingImg"
            />
            <span className="rightBarFollowingName">John Carter</span>
          </div>
          <div className="rightBarFollowingItem">
            <img
              src={`${PF}person/3.jpeg`}
              alt=""
              className="rightBarFollowingImg"
            />
            <span className="rightBarFollowingName">John Carter</span>
          </div>
          <div className="rightBarFollowingItem">
            <img
              src={`${PF}person/4.jpeg`}
              alt=""
              className="rightBarFollowingImg"
            />
            <span className="rightBarFollowingName">John Carter</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightBar">
      <div className="rightBarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};
