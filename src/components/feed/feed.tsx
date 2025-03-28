import { FC, useContext, useEffect, useState } from "react";
import { Post } from "../post/post";
import { Share } from "../share/share";
import "./feed.css";
import { IPostItemResponse } from "../../dummyData";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

interface FeedType {
  userName?: string;
}

export const Feed: FC<FeedType> = ({ userName }) => {
  const [posts, setPosts] = useState<IPostItemResponse[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getTimeline();
  }, []);

  const getTimeline = async () => {
    const res = userName
      ? await axios.get(`/posts/profile/${userName}`)
      : await axios.get("/posts/timeline/67e1087b32cd40820def0b23");
    if (res) {
      setPosts(res.data);
    }
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};
