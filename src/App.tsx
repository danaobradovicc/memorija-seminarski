import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pocetna from './stranice/Pocetna';
import Igra from './stranice/Igra';
import Rezultati from './stranice/Rezultati'; 
import Uputstvo from './stranice/Uputstvo';
import Istorija from './stranice/Istorija';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/igra" element={<Igra />} />
        <Route path="/rezultati" element={<Rezultati />} />
        <Route path="/uputstvo" element={<Uputstvo />} />
        <Route path="/istorija_rezultata" element={<Istorija />} />
      </Routes>
    </Router>
  );
}

export default App;


