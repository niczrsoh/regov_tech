import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from "../Screens/Login"
import { Register } from "../Screens/Register"
import { UserProfile } from '../Screens/UserProfile';
export default function Router(){
    return 
    (<>
        <Routes>
    <Route path="/profile" element={<UserProfile/>}></Route>

    </Routes>
    </>
    );
}