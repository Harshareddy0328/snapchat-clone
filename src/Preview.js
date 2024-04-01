import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { resetCameraImage, selectcameraImage } from './features/cameraSlice';
import CloseIcon from '@mui/icons-material/Close';
import "./Preview.css";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuid } from "uuid";
import { db, storage } from "./firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { selectUser } from './features/appSlice';

function Preview() {
  const cameraImg = useSelector(selectcameraImage);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!cameraImg) {
      navigate("/", { replace: true });
    } 
  },[cameraImg, navigate]);

  const closePreview = () => { 
    dispatch(resetCameraImage());
    navigate("/", {replace: true});
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
    .ref(`posts/${id}`)
    .putString(cameraImg, "data_url");

    uploadTask.on('state_changed', 
    null,
    (error) => {
      console.log(error);
    }, 
    () => {
      storage
      .ref("posts")
      .child(id)
      .getDownloadURL()
      .then((url) => {
        db.collection("posts").add({
          imageUrl: url,
          username: "Harsha Reddy",
          read: false,
          profilePic: user.profilePic,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        navigate("/chats", {replace: true});
      });
    }
    );
  };

  return (
    <div className='preview'>
    <CloseIcon className='preview__close' onClick={closePreview}/>
   <div className='preview__toolbarRight'>
    < TextFieldsIcon />
    < CreateIcon />
    < NoteIcon />
    < MusicNoteIcon />
    < AttachFileIcon />
    < CropIcon />
    < TimerIcon />

   </div>
   <img src={cameraImg} alt="" />
   <div onClick={sendPost} className='preview__footer'>
     <h2>Send Now</h2>
     < SendIcon fontSize="small" className="preview__sendIcon" />
   </div>
    </div>
  )
}

export default Preview
