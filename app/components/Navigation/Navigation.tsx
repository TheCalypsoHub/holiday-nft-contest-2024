import { useState } from 'react';
import { Underline } from '../Underline';
import { useLocation } from 'react-router';
import './styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/logo.svg" alt="Calypso Hub" />
          <h1>Holiday NFT Contest</h1>
        </div>
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <a href="/" className={`navbar-item ${pathname === "/" ? "active" : ""}`}><Underline text="Home" /></a>
          <a href="/mint" className={`navbar-item ${pathname === "/mint" ? "active" : ""}`}><Underline text="Mint" /></a>
          <div className="navbar-item">
            <ConnectButton showBalance={false} accountStatus="address" />
          </div>
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
            {isOpen
                ? (
                    <>
                        <span>X</span>
                    </>
                )
                : (
                    <>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </>
                )
            }
        </div>
      </div>
    </nav>
  );
};