import { useDispatch } from 'react-redux';
import { auth, logout } from './store/actions/auth';
import React, { useState } from 'react';

import './App.css';

function App() {

  const [data, setData] = useState({
    email: '',
    password:'',
    name: '',
    phoneNumber: ''
  })

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(auth(data))
  }

  

  const dispatch = useDispatch();

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <div>
        <label>
          Email
          <input 
          type='text'
          name= 'email'
          value={data.email}
          onChange={inputChangeHandler}
          />
        </label>
        </div>
        <div>
        <label>
          Password
          <input 
          type='password'
          name= 'password'
          value={data.password}
          onChange={inputChangeHandler}
          />
        </label>
        </div>
        <div>
        <label>
          Name
          <input 
          type='text'
          name= 'name'
          value={data.name}
          onChange={inputChangeHandler}
          />
        </label>
        </div>
        <div>
        <label>
          phoneNumber
          <input 
          type='text'
          name= 'phoneNumber'
          value={data.phoneNumber}
          onChange={inputChangeHandler}
          />
        </label>
        </div>
        <button type='submit'>
          Submit
        </button>
      </form>
      <button
      onClick={() => dispatch(logout())}
      >logout</button>
    </div>
  );
}

export default App;
