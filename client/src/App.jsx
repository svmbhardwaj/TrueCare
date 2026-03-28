import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './components/LoginPage/LoginPage';
import HospitalDetails from './components/HospitalDetails/HospitalDetails';
import HomePage from './components/HomePage/HomePage';
import BillAI from './components/BillAI/BillAI';
import BillResult from './components/BillAI/BillResult';
import History from './components/History/History';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="app-main-container">
      {!isLoginPage && <Navbar />}

      <div className="page-content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/hospital/:id" element={<HospitalDetails />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/details" element={<HomePage />} />
          <Route path="/truebill" element={<BillAI />} />
          <Route path="/truebill/result" element={<BillResult />} />
          <Route path="/truebill/results" element={<Navigate to="/truebill/result" replace />} />
          <Route path="/result" element={<Navigate to="/truebill/result" replace />} />
          <Route path="/results" element={<Navigate to="/truebill/result" replace />} />
          <Route path="/bill-ai" element={<Navigate to="/truebill" replace />} />
          <Route path="/bill-result" element={<Navigate to="/truebill/result" replace />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
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