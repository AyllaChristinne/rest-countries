import Home from "./pages/Home/Home";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router";
import Details from "./pages/Details/Details";
import Navbar from "./components/Navbar/Navbar";
import "./index.scss";
import { NotFound } from "./components/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:country" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
