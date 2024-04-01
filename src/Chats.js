import { Avatar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import "./Chats.css";
import React, { useEffect, useState } from 'react';
import {auth, db} from "./firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { useNavigate } from "react-router-dom";
import {resetCameraImage} from "./features/cameraSlice";


function Chats() {

    const [posts, setPosts] = useState();
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        db.collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => 
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            );   
        }, []);

        const makeSnap = () => {
            dispatch(resetCameraImage());
            navigate("/", { replace: true });
        };

  return (
    <div className="chats">
      <div className="chats__header">
        < Avatar src={user.profilePic} onClick={() => auth.signOut()} className="chats__avatar"/>
        <div className="chats__search">
            < SearchIcon className="searchIcon"/>
            <input placeholder="Friends" type="text"/>
        </div>   
        < ChatBubbleIcon className="chatIcon "/>
        </div>
        <div className="chat__posts">
        {posts?.map(
            ({
                id,
                data: {profilePic, username, timestamp, imageUrl, read },

            }) => (
                < Chat 
                key={id}
                id={id}
                username={username}
                timestamp={timestamp}
                imageUrl={imageUrl}
                read={read}
                profilePic={profilePic}
                />
            )
        )}
        </div>
        <RadioButtonUncheckedOutlinedIcon
        className="radioButton"
        onClick={makeSnap}
        fontSize='large'

        />
    </div>
  )
}

export default Chats
