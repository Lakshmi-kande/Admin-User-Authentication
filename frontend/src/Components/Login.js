import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = role === 'admin' ? 'http://localhost:3000/api/admin/login' : 'http://localhost:3000/api/user/login';
      const response = await axios.post(endpoint, {
        email,
        password
      });

      console.log('login:', response.data);
      if (response.data.Status === 'Success') {
        if (response.data.role === 'admin') {
          window.location.href = 'http://localhost:3001/api/dashboard/users';
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input
              type='email'
              placeholder='Enter Email'
              autoComplete='off'
              name='email'
              className='form-control rounded-0'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              className='form-control rounded-0'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='role'>
              <strong>Role:</strong>
            </label>
            <select
              name='role'
              className='form-control rounded-0'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value=''>Select Role</option>
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>
            Login
          </button>
        </form>
        <p>Create new account?</p>
        <Link
          to='/register'
          className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;


