import { BrowserRouter as Router, Link } from 'react-router-dom';
import React from 'react';
import "./App.css";
import NavBar from './components/navbar/NavBar';
import Footer from './pages/Footer';
import Routers from './routers/Routers';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="headOfPage">
          <Link to="/">
            <h3><span>Two</span>Candels</h3>
          </Link>
          <NavBar />
        </header>
        <Routers />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
