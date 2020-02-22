import React, { useState } from 'react';
import { axiosWithAuth } from './axiossWithAuth';

const Login = props => {
  const [cred, setCred] = useState({
    username: '',
    password: ''
  });

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', cred)
      .then(res => {
        console.log('this is the res', res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/protected');
      })
      .catch(err => {
        localStorage.removeItem('token');
        console.log('Invalid login', err);
      });
  };

  const handleChange = e => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={login}>
          <input
            type='text'
            name='username'
            value={cred.username}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            value={cred.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
      {/* <p>Build a login page here</p> */}
    </>
  );
};

export default Login;
