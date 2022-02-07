import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import { Navbar, Sidebar, Cryptocurrencies, Exchanges, Mining, News, CoinDetails } from './components';
import { fetchUser } from './utility/fetchUser';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();
    if (!user) navigate("/login");
  }, [])

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
        <Route path="/coins/:coinId" element={<CoinDetails />} />
      </Routes>
    </>
  );
}

export default App;