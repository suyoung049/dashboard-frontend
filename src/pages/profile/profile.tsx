import { Sidebar } from "../../components/sidebar/sidebar";
import { Topbar } from "../../components/topbar/Topbar";
import "./profile.css";
import { RightBar } from "../../components/rightbar/rightbar";
import { Feed } from "../../components/feed/feed";
import { useEffect, useState } from "react";
import axios from "axios";
import { IUserItemResponse } from "../../dummyData";
import { useParams } from "react-router";

export const Profile = () => {
  const [user, setUser] = useState<IUserItemResponse>();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER as string;
  const username = useParams().username;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get(`/users?userName=${username}`);
    if (res) {
      setUser(res.data);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={PF + user?.coverPicture || PF + "person/noCover.png"}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={PF + user?.profilePicture || PF + "person/noAvatar.png"}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.userName}</h4>
              <span className="profileInfoDesc">{user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userName={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};
