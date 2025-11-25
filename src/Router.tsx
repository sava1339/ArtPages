import { Routes, Route, Navigate  } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelectedPost } from './store/selectedPost'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PostView from './components/PostView';
import Chat from './components/Chat';
import { useAuthUser } from './store/authUser';
import { HOME_ROUTE } from './utils/consts';
import { routes_anon, routes_auth } from './routes/routes';
import { useSubCommunityes } from './store/subCommunityes';
import { useRecentCommunity } from './store/recentCommunity';
import { useSavePosts } from './store/savePosts';
import { useRecentPosts } from './store/recentPosts';
import { usePosts } from './store/posts';
import { useChatRooms } from './store/chatRooms';
import { useCommunityes } from './store/communityes';

function App() {
  const [isChatOpen,setIsChatOpen] = useState(false);
  const {getSubCommunity} = useSubCommunityes();
  const {getRecentCommunityes} = useRecentCommunity();
  const {communityes} = useCommunityes();
  const {getRecentPosts} = useRecentPosts();
  const {getSaveByUser} = useSavePosts();
  const {fetchRoomsByUser} = useChatRooms();
  const {posts} = usePosts();
  const {auth,isAuth,userData} = useAuthUser();
  const selectedPost = useSelectedPost((state)=>state.selectedPost);
  const ChatOpen = () =>{
    setIsChatOpen(!isChatOpen);
  }
  useEffect(()=>{
    auth();
  },[])
  useEffect(()=>{
    if(isAuth && userData){
      getSubCommunity(userData.id);
      getRecentCommunityes();
      getRecentPosts();
      getSaveByUser(userData.id);
      fetchRoomsByUser(userData.id);
    }
  },[isAuth])
  useEffect(()=>{
    getRecentPosts();
  },[posts])
  return (
    <>
      <Header ChatOpen={ChatOpen} />
      <Sidebar/>
      {selectedPost && <PostView data={selectedPost}/>}
      {isChatOpen && <Chat ChatOpen={ChatOpen}/>}
      <Routes>
        <Route path="/" element={<Navigate to={HOME_ROUTE} replace />} />
        {isAuth && routes_auth.map(({path,Component})=>(
          <Route key={path} path={path} element={<Component/>}/>
        ))}
        {routes_anon.map(({path,Component})=>(
          <Route key={path} path={path} element={<Component/>}/>
        ))}
        <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
      </Routes>
    </>
  )
}

export default App
