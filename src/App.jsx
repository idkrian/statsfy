import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import Track from './pages/Track'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Artist from './pages/Artist';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/track/:id' element={<Track />} />
        <Route path='/artist/:id' element={<Artist />} />
      </Routes>
    </Router>

  )
}

export default App
