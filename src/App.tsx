import Home from "./pages/home";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router";
import Details from "./pages/details";
import Navbar from "./components/navbar";
import "./index.scss";
import { NotFound } from "./components/notFound";

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
