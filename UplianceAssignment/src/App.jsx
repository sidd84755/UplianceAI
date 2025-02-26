import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Userdata from './pages/Userdata';
import Counter from './pages/Counter';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/userdata"
        element={
          <ProtectedRoute>
            <Userdata />
          </ProtectedRoute>
        }
      />
      <Route
        path="/counter"
        element={
          <ProtectedRoute>
            <Counter />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
