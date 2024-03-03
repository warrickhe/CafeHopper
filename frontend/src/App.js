import './App.css';
import LandingPage from './pages/LandingPage';
import QueryPage from './pages/QueryPage';
import ResultsPage from './pages/ResultsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Landing" element={<LandingPage />} />
          <Route path="/Query" element={<QueryPage />} />
          <Route path="/Results" element={<ResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
