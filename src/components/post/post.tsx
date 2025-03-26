import { FC, useState } from "react";
import { IPostItem } from "../../dummyData";
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../dummyData";

interface IPostProps {
  post: IPostItem;
}

export const Post: FC<IPostProps> = ({ post }) => {
  const userName = Users.filter((u) => u.id === post.userId)[0].username;
  const userProfile = Users.filter((u) => u.id === post.userId)[0]
    .profilePicture;
  const [like, setLike] = useState<number>(post.like);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const likeHandler = () => {
    setLike((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={userProfile} alt="" className="postProfileImg" />
            <span className="postUserName">{userName}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.photo} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src="/assets/like.png"
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src="/assets/heart.png"
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
