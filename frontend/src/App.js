import './App.css';
import LandingPage from './pages/LandingPage';
import QueryPage from './pages/QueryPage';
import ResultsPage from './pages/ResultsPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact component={<LandingPage/>}/>
          <Route path="/Query" component={<QueryPage/>}/>
          <Route path="/Results"  component={<ResultsPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
