import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/screens/Login/login';
import Reg from './components/screens/Reg/reg';
import Chatpage from "./components/screens/ChatPage/chatpage.jsx";
import { CookiesProvider } from 'react-cookie';

function App(){
    return (
        <CookiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/api/v1/auth/login" element={<Login/>} />
                    <Route path="/api/v1/auth/reg" element={<Reg/>} />
                    <Route path="/api/v1/auth/chat" element={<Chatpage/>} />
                </Routes>
            </BrowserRouter>
        </CookiesProvider>
    )
}

export default App;