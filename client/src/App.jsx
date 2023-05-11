import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { Home, Register, SingleBlog } from "./pages";

function App() {
  return (
    <div className="App font-opensans">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
