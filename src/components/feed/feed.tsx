import { FC, useContext, useEffect, useState } from "react";
import { Post } from "../post/post";
import { Share } from "../share/share";
import "./feed.css";
import { IPostItemResponse } from "../../dummyData";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { IsPostContext } from "../../context/PostContext";

interface FeedType {
  userName?: string;
}

export const Feed: FC<FeedType> = ({ userName }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<IPostItemResponse[]>([]);
  const { isPost } = useContext(IsPostContext);

  useEffect(() => {
    getTimeline();
  }, [userName, isPost]);

  const getTimeline = async () => {
    const res = userName
      ? await axios.get(`/posts/profile/${userName}`)
      : await axios.get(`/posts/timeline/${user?._id}`);
    if (res) {
      setPosts(res.data);
    }
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {userName ? userName === user?.userName && <Share /> : <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};
