import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import  Preview  from './Preview';
import Chats from './Chats';
import ChatView from "./ChatView";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./Login";
import { auth } from './firebase';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect( () => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(login({
                  username: authUser.displayName,
                  profilePic: authUser.photoURL,
                  id: authUser.uid,
                }))
              }
      else {
        dispatch(logout());
      }
    })
  },[]);


  return (
    <div className='app'>
       <Router>
        { !user ? (
          < Login />
        ) : (
          <>
          < img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGGSbNOn3r3j1xyPqbANtIuhg15t-BkNe8H1AXRNpjQ&s" className='image' altr=""/>
          <div className='app__body'>
          <div className='body_background'> 
            <Routes>
              <Route exact path="/" element={<WebcamCapture/>}/>
              <Route exact path="/preview" element={<Preview />}/>
              <Route exact path="/chats" element={< Chats />}/>
              <Route exact path="/chats/view" element={< ChatView />}/>
            </Routes>
            </div>
          </div>
          
        </>
        )}
    </Router>
    </div>
  )
}

export default App;
