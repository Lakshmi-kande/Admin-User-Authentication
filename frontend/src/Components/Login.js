import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/admin/login', {
        email,
        password,
      });

      console.log('login:', response.data);
      if (response.data.Status === 'Success') {
        if (response.data.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        <p>Already have an account?</p>
        <Link
          to="/register"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;















// import React from 'react'
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
// // import './App.css'; 
// import './Login.css'


// function Login() {
//     const [email, setEmail] = useState()
//     const [password, setPassword] = useState()
//     const navigate = useNavigate()

//     axios.defaults.withCredentials = true;
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         axios.post('http://localhost:3000/login', {email, password})
//         .then(res => {
//             console.log("login: " + res.data);
//             if(res.data.Status === "Success") {
//                 if(res.data.role === "admin") {
//                     navigate('/dashboard')
//                 } else {
//                     navigate('/')
//                 }
//             }
//         }).catch(err => console.log(err))
//     }

//     return(
//         <div className="login-container">
//           <div className="login-form">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Email</strong>
//             </label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               autoComplete="off"
//               name="email"
//               className="form-control rounded-0"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Password</strong>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               name="password"
//               className="form-control rounded-0"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit" className="btn btn-success w-100 rounded-0">
//             Login
//           </button>
//           </form>
//           <p>Already Have an Account</p>
//           <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
//             Sign Up
//           </Link>
        
//       </div>
//     </div>
//     )
// }

// export default Login;