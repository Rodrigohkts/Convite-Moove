import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Confirmados from './pages/Confirmados';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirmados" element={<Confirmados />} />
      </Routes>
    </BrowserRouter>
  );
}
