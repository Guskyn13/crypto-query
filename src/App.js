import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import { Navbar, Cryptocurrencies, Exchanges, Mining, News, CoinDetails, Sidebar } from './components';
import { fetchUser } from './utility/fetchUser';
import { userQuery } from './utility/data';
import { client } from './client';

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userInfo = fetchUser();

  useEffect(() => {
    const user = fetchUser();
    if (!user) navigate("/login");
  }, [navigate])

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
        setUser(data[0])
    })
}, [userInfo])

  return (
    <>
      <div className='sticky top-0 bg-black'>
        <Navbar />
        <Sidebar user={user && user} />
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