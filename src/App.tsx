import Home from './pages/Home/Home';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import Details from './pages/Details/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />}/>
        <Route path="/:country" element={<Details />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
