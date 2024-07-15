import './App.css';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Register from './pages/auth/Register';
import Validate from './pages/auth/Validate';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/validate' element={<Validate />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
