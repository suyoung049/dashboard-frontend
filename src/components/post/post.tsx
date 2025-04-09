import { FC, useContext, useEffect, useState } from "react";
import { IPostItemResponse, IUserItemResponse } from "../../dummyData";
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface IPostProps {
  post: IPostItemResponse;
}

export const Post: FC<IPostProps> = ({ post }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState<IUserItemResponse>();
  const [like, setLike] = useState<number>(post.likes.length);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER as string;

  useEffect(()=> {
    setIsLiked(post.likes.includes(currentUser?._id as string))
  }, [currentUser?._id, post.likes])


  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get(`/users?userId=${post.userId}`);
    if (res) {
      setUser(res.data);
    }
  };

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser?._id });
    } catch (e) {}
    setLike((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user?.userName}`}>
              <img
                src={PF + user?.profilePicture || PF + "person/noAvatar.png"}
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUserName">{user?.userName}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF + post?.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}like.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src={`${PF}heart.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comment</span>
          </div>
        </div>
      </div>
    </div>
  );
};
