import { Route, Router,Routes,Navigate } from "react-router-dom";
import {NotificationContainer} from 'react-notifications';
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import UpdateProfile from "./components/UpdateProfile";
import ForgetPage from "./components/ForgetPage";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";




function App() {

  const theme = useSelector((state)=>state.theme.darkMode);
  const isAuthenticated = useSelector((state)=>state.auth.token)

  return (
    <div className={`min-h-screen ${theme ? 'bg-gradient-to-r from-gray-800 to-black text-white' : 'bg-gradient-to-r from-white to-green-100 text-black'} transition-colors duration-300`}>
    <NotificationContainer />
    <Header />
    <main className="w-[90%] mx-auto py-6">
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/signUp" element={<SignUp />} />
            <Route path="/updateProfile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
     
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPage" element={<ProtectedRoute><ForgetPage /></ProtectedRoute>} />
      </Routes>
    </main>
  </div>  
  );
}

export default App;
