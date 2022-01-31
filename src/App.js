import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import { Navbar, Sidebar, Cryptocurrencies, Exchanges, Mining, News } from './components';

const App = () => {
  return (
    <>
      <div className='sticky top-0 bg-black'>
        <Navbar />
        <Sidebar />
      </div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/miningcrypto" element={<Mining />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
}

export default App;