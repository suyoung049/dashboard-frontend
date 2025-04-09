import "./rightbar.css";
import { IUserItemResponse, Users } from "../../dummyData";
import { Online } from "../online/online";
import { FC, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

interface IRightBarProps {
  user?: IUserItemResponse;
}

interface IFriendResponse {
  _id: string;
  userName: string;
  profilePicture: string;
}

export const RightBar: FC<IRightBarProps> = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER as string;
  const [friends, setFriends] = useState<IFriendResponse[]>([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState<boolean>(currentUser?.followings?.includes(user?._id as string) as boolean);

  useEffect(() => {
    setFollowed(
      currentUser?.followings?.includes(user?._id as string) as boolean
    );
  }, [user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`/users/friends/${user?._id}`);
        setFriends(friendList.data);
      } catch (e) {
        console.error(e);
      }
    };
    getFriends();
  }, [user?._id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user?._id}/unfollow`, {
          userId: currentUser?._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user?._id });
      } else {
        await axios.put(`/users/${user?._id}/follow`, {
          userId: currentUser?._id,
        });
        dispatch({ type: "FOLLOW", payload: user?._id });
      }
    } catch (e) {
      console.error(e);
    }
    setFollowed((prev) => !prev);
  };
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
        {user?.userName !== currentUser?.userName && (
          <button className="rightBarFollowButton" onClick={handleClick}>
            {followed ? "unFollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
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
          {friends.map((friend) => (
            <Link
              to={`/profile/${friend?.userName}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="rightBarFollowingItem">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar"
                  }
                  alt=""
                  className="rightBarFollowingImg"
                />
                <span className="rightBarFollowingName">{friend.userName}</span>
              </div>
            </Link>
          ))}
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
