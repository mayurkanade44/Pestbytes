import "./App.css";
import { Navbar } from "./components";
import { Home } from "./pages";

function App() {
  return (
    <div className="App font-opensans">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
