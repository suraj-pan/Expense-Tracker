import { Route, Router,Routes,Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import UpdateProfile from "./components/UpdateProfile";
import ForgetPage from "./components/ForgetPage";
import { useSelector } from "react-redux";
import Product from "./components/Product";
import CartPage from "./components/CartPage";



function App() {

  const theme = useSelector((state)=>state.theme.darkMode);
  const isAuthenticated = useSelector((state)=>state.auth.token)

  console.log(theme)
  return (
    <div className={`w-[90%] mx-auto h-full ${theme ? 'bg-black text-white':'bg-white text-black'}`}>
    
    <Header/>
    <Routes>
    <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />
    <Route path="/signUp" element={<SignUp/>} />
    <Route path="/product" element={<Product/>} />
    <Route path="/updateProfile" element={<UpdateProfile/>} />
    <Route path="/cart" element={<CartPage/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/login" element={ <Login/>} />
    <Route path="/forgetPage" element={ <ForgetPage/>} />
      </Routes>
    </div>   
  );
}

export default App;
