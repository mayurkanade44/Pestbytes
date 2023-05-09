import "./App.css";
import { Footer, Navbar } from "./components";
import { Home } from "./pages";

function App() {
  return (
    <div className="App font-opensans">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
