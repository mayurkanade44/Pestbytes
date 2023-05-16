import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Navbar } from "./components";
import {
  ForgotPassword,
  Home,
  Login,
  Register,
  ResetPassword,
  SingleBlog,
  VerifyAccount,
  UserProfile,
  AddBlog,
} from "./pages";

function App() {
  return (
    <div className="App font-opensans">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
