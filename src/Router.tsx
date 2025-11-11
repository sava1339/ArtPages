import { Routes, Route, Navigate  } from 'react-router-dom'
import { useState } from 'react'
import { useSelectedPost } from './store/selectedPost'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PostView from './components/PostView';
import Chat from './components/Chat';
import Main from './pages/Main';
import Commutnity from './pages/Community';
import Profile from './pages/Profile';
import CreateCommunity from './pages/CreateCommunity';
import CreatePost from './pages/CreatePost';

function App() {
  const [isChatOpen,setIsChatOpen] = useState(false);
  const selectedPost = useSelectedPost((state)=>state.selectedPost);
  const ChatOpen = () =>{
    setIsChatOpen(!isChatOpen);
  }
  return (
    <>
      <Header ChatOpen={ChatOpen} />
      <Sidebar/>
      {selectedPost && <PostView data={selectedPost}/>}
      {isChatOpen && <Chat ChatOpen={ChatOpen}/>}
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path='/home' element={<Main/>}/>
        <Route path='/popular' element={<Main />}/>
        <Route path='/user/:username' element={<Profile/>}/>
        <Route path='/community/:communityName' element={<Commutnity/>}/>
        <Route path='/createcommunity' element={<CreateCommunity/>} />
        <Route path='/createpost' element={<CreatePost/>} />
        <Route path='/community/:communityName/createpost' element={<CreatePost/>} />
      </Routes>
    </>
  )
}

export default App
