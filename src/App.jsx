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
                    <Route path="login" element={<Login/>} />
                    <Route path="reg" element={<Reg/>} />
                    <Route path="chat" element={<Chatpage/>} />
                </Routes>
            </BrowserRouter>
        </CookiesProvider>
    )
}

export default App;