import React, { useContext, useEffect, useRef, useState } from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { IsPostContext } from "../../context/PostContext";

interface INewPost {
  userId: string;
  desc: string;
  img?: string;
}

export const Share = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER as string;
  const desc = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const { isPost, setIsPost } = useContext(IsPostContext);

  useEffect(() => {
    if (desc.current) {
      desc.current.value = "";
    }
  }, [isPost]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newPost: INewPost = {
      userId: user?._id as string,
      desc: desc.current?.value as string,
    };

    if (file) {
      const data = new FormData();
      data.append("file", file);
      try {
        const res = await axios.post("/upload", data);
        const uploadFileName = res.data.fileName;
        newPost = { ...newPost, img: uploadFileName }; // 파일 이름 예상값
      } catch (e) {
        console.log(e);
        return;
      }
    }

    try {
      await axios.post("/posts", newPost);
      if (setIsPost) {
        setIsPost((prev) => !prev);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user?.profilePicture
                ? PF + user?.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={`What's in your mind ${user?.userName} ?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => {setFile(null)}}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <label htmlFor="file" className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={handleFile}
              />
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions color="secondary" className="shareIcon" />
              <span className="shareOptionText">Feeling</span>
            </div>
          </label>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};
