import { Route, Router,Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <div className="w-full h-full">
    
    <Header/>
    <Routes>
    <Route path="/signUp" element={<SignUp/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/login" element={ <Login/>} />
    </Routes>
    </div>   
  );
}

export default App;
