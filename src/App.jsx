import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Login from './components/screens/Login/login'
import Reg from './components/screens/Reg/reg'
import { CookiesProvider } from 'react-cookie';

function App(){
    return (
        <CookiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login/>} />
                    <Route path="reg" element={<Reg/>} />
                </Routes>
            </BrowserRouter>
        </CookiesProvider>
    )
}

export default App;