import React from 'react';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import './Header.css';

const Header = ({ user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">SERS</span>
        </div>
        <nav className="nav" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span className="nav-tag">AI Powered</span>
          {user && (
            <button 
              onClick={handleLogout} 
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
              }}
            >
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
