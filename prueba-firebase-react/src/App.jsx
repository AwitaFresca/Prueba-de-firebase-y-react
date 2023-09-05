import {Routes, Route} from 'react-router-dom';
import './App.css'
import { Home } from './components/Home';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Register } from './components/Register';
import { AuthProvider } from './context/authContext';


function App() {

  return (
    <AuthProvider>
      <Routes>
      <Route path="/" element={
        // Home va a ser una ruta protegida y los usuarios anonimos no podran acceder a ella
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
