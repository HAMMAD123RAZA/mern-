import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';
import GetItem from './GetItem';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import Navbar from './Navbar';

const Home = () => (
  <>
    <InputField />
    <GetItem />
  </>
);

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to='/login' />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-black h-[100vh]">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
