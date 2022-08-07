import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Policy from "./pages/policy";
import Editor from "./pages/editor";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./components/Loader";
import Profile from "./pages/Profile";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <Loader size={200} />;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editor/:pid" element={<Editor />} />
    </Routes>
  );
}

export default App;
