import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import BillAI from './components/BillAI/BillAI';
import History from './components/History/History';
import Dashboard from './components/Dashboard/Dashboard'; // Added this import

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="app-main-container">
      {!isLoginPage && <Navbar />}

      <div className="page-content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/truebill" element={<BillAI />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Added this route */}
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;