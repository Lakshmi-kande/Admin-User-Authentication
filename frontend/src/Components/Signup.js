import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = role === 'admin' ? '/api/admin/register' : '/api/user/register';
      const response = await axios.post(endpoint, {
        name,
        email,
        password,
        mobile,
        address,
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='signup-container'>
      <div className='signup-form'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'>
              <strong>Name:</strong>
            </label>
            <input
              type='text'
              placeholder='Enter Name'
              autoComplete='off'
              name='name'
              className='form-control rounded-0'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email:</strong>
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
              <strong>Password:</strong>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              className='form-control rounded-0'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='mobile'>
              <strong>Mobile:</strong>
            </label>
            <input
              type='text'
              placeholder='Enter Mobile'
              autoComplete='off'
              name='mobile'
              className='form-control rounded-0'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='address'>
              <strong>Address:</strong>
            </label>
            <input
              type='text'
              placeholder='Enter Address'
              autoComplete='off'
              name='address'
              className='form-control rounded-0'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
            Register
          </button>
        </form>
        <p>Already Have an Account</p>
        <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
