import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../App.css';
import profilePic from "./user image.png";

function Dashboard(){
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get('http://localhost:3000/api/dashboard/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log('Error fetching users:', err);
      });
  };

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:3000/api/dashboard/users/${userId}`)
      .then(res => {
        console.log(res.data);
        getUsers(); 
      })
      .catch(err => {
        console.log('Error deleting user:', err);
      });
  };

  return(
    <div className='container'>
      <div className='mt-3'>
        <h3>Users List dashboard</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <img className="ui-avatar-image" src={profilePic} alt="profilePic" />
                </td>
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.mobile}</td>
                <td>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
