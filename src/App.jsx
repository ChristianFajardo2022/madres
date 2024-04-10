import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Formulario from './componentes/Formulario';
import Grabadora from './componentes/Grabadora';
import Administrador from './componentes/Administrador';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Grabadora />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="administrador" element={<Administrador />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
