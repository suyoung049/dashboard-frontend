import { Sidebar } from "../../components/sidebar/sidebar";
import { Topbar } from "../../components/topbar/Topbar";
import "./profile.css";
import { RightBar } from "../../components/rightbar/rightbar";
import { Feed } from "../../components/feed/feed";

export const Profile = () => {
  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="assets/post/3.jpeg"
                alt=""
                className="profileCoverImg"
              />
              <img
                src="assets/person/7.jpeg"
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">John Park</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <RightBar type='profile'  />
          </div>
        </div>
      </div>
    </>
  );
};
