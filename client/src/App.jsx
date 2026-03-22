import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage/LoginPage'
import HospitalDetails from './components/HospitalDetails/HospitalDetails'
import HomePage from './components/HomePage/HomePage'
import Dashboard from './components/Dashboard/Dashboard'
import BillAI from './components/BillAI/BillAI'
import BillResult from './components/BillAI/BillResult'
import History from './components/History/History'
import './index.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/hospital/:id" element={<HospitalDetails />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/details" element={<HomePage />} />
          <Route path="/bill-ai" element={<BillAI />} />
          <Route path="/bill-result" element={<BillResult />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
