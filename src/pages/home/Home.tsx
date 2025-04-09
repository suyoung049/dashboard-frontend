import { Feed } from "../../components/feed/feed";
import { RightBar } from "../../components/rightbar/rightbar";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Topbar } from "../../components/topbar/Topbar";
import { IsPostProvider } from "../../context/PostContext";
import "./home.css";

export const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <IsPostProvider>
          <Feed />
        </IsPostProvider>
        <RightBar />
      </div>
    </>
  );
};
