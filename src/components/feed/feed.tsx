import { FC, useContext, useEffect, useState } from "react";
import { Post } from "../post/post";
import { Share } from "../share/share";
import "./feed.css";
import { IPostItemResponse } from "../../dummyData";
import axios from "axios";
import { AuthContext, refreshAccessToken } from "../../context/AuthContext";
import { IsPostContext } from "../../context/PostContext";

interface FeedType {
  userName?: string;
}

export const Feed: FC<FeedType> = ({ userName }) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<IPostItemResponse[]>([]);
  const { isPost } = useContext(IsPostContext);

  useEffect(() => {
    getTimeline();
  }, [userName, isPost]);

  const getTimeline = async () => {
    const fetchPosts = async (token: string) => {
      const endpoint = userName ? `/posts/profile/${userName}` : `/posts/timeline/${user?._id}`;
      const config = userName ? {} : { headers: { authorization: `Bearer ${token}` } };
      return axios.get(endpoint, config);
    };
  
    try {
      const res = await fetchPosts(accessToken as string);
      setPosts(res.data);
    } catch (error) {
      try {
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) throw new Error("Failed to refresh token");
  
        const newRes = await fetchPosts(newAccessToken);
        setPosts(newRes.data);
      } catch (refreshError) {
        console.error("Failed to fetch posts after refreshing token", refreshError);
      }
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
