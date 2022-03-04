import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Policy from "./pages/policy";
import Editor from "./pages/editor";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/editor/:pid" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
