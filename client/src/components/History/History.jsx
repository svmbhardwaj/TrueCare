import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  MapPin, 
  ChevronRight, 
  Search,
  Filter,
  Download
} from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import './History.css';

const History = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const historyItems = [
    {
      id: 1,
      type: 'Bill Audit',
      title: 'St. Jude Medical Center',
      date: 'Oct 24, 2024',
      amount: '₹1,42,500',
      outcome: '₹16,500 Savings Found',
      status: 'Claim Filed',
      icon: <FileText size={20} className="text-hunter" />
    },
    {
      id: 2,
      type: 'Emergency Navigation',
      title: 'City Medical Center',
      date: 'Oct 20, 2024',
      amount: 'Admission Assistance',
      outcome: 'Verified Bed Secured',
      status: 'Completed',
      icon: <MapPin size={20} className="text-teal" />
    },
    {
      id: 3,
      type: 'Bill Audit',
      title: 'Apollo Pharmacy Ltd.',
      date: 'Oct 18, 2024',
      amount: '₹4,200',
      outcome: 'Fair Match Verified',
      status: 'Archived',
      icon: <FileText size={20} className="text-hunter" />
    }
  ];

  const filteredHistoryItems = historyItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    alert('Generating your comprehensive Annual Care Report (PDF)... Please wait.');
  };

  const handleItemClick = (item) => {
    if (item.type === 'Bill Audit') {
      navigate('/bill-result');
    } else {
      navigate('/hospital/1');
    }
  };

  return (
    <div className="history-page page-container">
      <Navbar />
      
      <div className="history-container">
        <header className="history-header">
          <div className="header-text">
            <h1>Care History</h1>
            <p>Track your past audits, emergency navigations, and financial claims.</p>
          </div>
          <div className="history-actions">
            <div className="search-bar">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search history..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-filter">
              <Filter size={18} /> Filter
            </button>
          </div>
        </header>

        <section className="history-list">
          {filteredHistoryItems.length > 0 ? (
            filteredHistoryItems.map((item) => (
              <div key={item.id} className="history-card" onClick={() => handleItemClick(item)}>
                <div className="card-left">
                  <div className="item-icon-bg">
                    {item.icon}
                  </div>
                  <div className="item-details">
                     <span className="item-type">{item.type}</span>
                     <h3>{item.title}</h3>
                     <p className="item-date">{item.date}</p>
                  </div>
                </div>
                
                <div className="card-middle">
                  <div className="item-stat">
                    <span className="stat-label">Value</span>
                    <p className="stat-value">{item.amount}</p>
                  </div>
                  <div className="item-stat">
                    <span className="stat-label">Outcome</span>
                    <p className="stat-value outcome-highlight">{item.outcome}</p>
                  </div>
                </div>

                <div className="card-right">
                  <span className={`status-tag ${item.status.toLowerCase().replace(' ', '-')}`}>
                    {item.status}
                  </span>
                  <button className="btn-icon-round">
                     <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No history items found matching your search.</p>
              <button className="btn-text" onClick={() => setSearchTerm('')}>
                Clear search
              </button>
            </div>
          )}
        </section>

        <footer className="history-footer">
           <button className="btn-export-full" onClick={handleExport}>
             <Download size={18} /> Export Full Annual Report (PDF)
           </button>
        </footer>
      </div>
    </div>
  );
};

export default History;
