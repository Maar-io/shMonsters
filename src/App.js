import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NBar from './components/NBar'
import Home from './components/Home'
import About from './components/About'


function App() {
  console.log("ShMonster Gallery version 0.0.1")

  return (

    <React.Fragment>
      <Router>
        <NBar />
        <Routes>
              <Route exact path="/" element={Home} />
              <Route path="/home" element={Home} />
              <Route path="about" element={About} />

            </Routes>
      </Router>
    </React.Fragment>

  );
}

export default App;
