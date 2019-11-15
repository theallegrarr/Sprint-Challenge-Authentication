import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import axiosWithAuth from './axiosWithAuth';
import './App.css';

function App() {
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });
  const [jokes, setJokes] = useState({})
  const [token, setToken] = useState('');
  
  const onLogin = () => {
  axios.post(`http://localhost:3300/api/auth/login`, login)
    .then(res => {
      localStorage.setItem('token', res.data.token)
      getJokes(res.data.token);
      //setToken(res.data.token)
    }).catch(err => console.log(err))
  }

  const onRegister = () => {
    axios.post(`http://localhost:3300/api/auth/register`, login)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        getJokes(res.data.token);
      }).catch(err => console.log(err))
    }

  const getJokes = (currToken) => {
    axios({
      method: 'get',
      url: `http://localhost:3300/api/jokes/`,
      data: {},
      headers: {
        'Content-Type': 'application/json',
         authorization: currToken,
      },
    }).then(res => {
      console.log(res.data)
        setJokes(res.data)
        setToken(currToken)
      }).catch(err => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h3>Welcome to Dad Jokes</h3>
        {
          !token ?
          <div>
            <p>Username: </p><input
              onChange={(e) => setLogin({
                ...login,
                username: e.target.value
              })}
            ></input>
            <p>Username: </p><input
              onChange={(e) => setLogin({
                ...login,
                password: e.target.value
              })}
            ></input>
            <button
              onClick={onRegister}
            >Register</button>
          </div>
          :
          <Jokes jokes={jokes}/>
        }
      </header>
    </div>
  );
}

function Jokes({ jokes }){

  return (
    <>
    {
    jokes.map(joke => (
      <div key={joke.id}>
        <h3>{joke.joke}</h3>
      </div>
    ))
  }
  </>
  )
}

export default App;
