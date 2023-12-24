import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Login from "./modules/Login/login"
import Reg from './modules/Reg/reg.jsx';
import Chatpage from './modules/ChatPage/chatpage'
import { useState, useEffect } from 'react';
import { CookieContext } from './utils/context.jsx';

function App() {

    const [isCookie, setIsCookie] = useState(false)

    useEffect(() => {
        if (document.cookie) {
            setIsCookie(true)
        } else {
            setIsCookie(false)
        }
    }, [])

    return (
        <CookieContext.Provider value={setIsCookie}>
            <BrowserRouter>
                <Routes>

                    <Route path="/login" element={(!isCookie) ? <Login /> : <Navigate to='/chat' />} />
                    <Route path="/reg" element={(!isCookie) ? <Reg /> : <Navigate to='chat' />} />
                    <Route path="/chat" element={(isCookie) ? <Chatpage /> : <Navigate to="/login" />} />
                    <Route path="*" element={<Navigate to="/chat" />} />

                </Routes>
            </BrowserRouter>
        </CookieContext.Provider>
    )
}

export default App;