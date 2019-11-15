import React, {useState} from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });
  const [jokes, setJokes] = useState({})
  const [token, setToken] = useState('');
  
  const onRegister = () => {
    axios.post(`http://localhost:3300/api/auth/register`, login)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        getJokes(res.data.token);
      }).catch(err => console.log(err))
    }
  
  const onLogin = () => {
    axios.post(`http://localhost:3300/api/auth/login`, login)
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
        return(<Redirect to='/jokes' />)
      }).catch(err => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Welcome to Dad Jokes</h3>
        <div className='links'>
          <NavLink key={'001'} to={'/'}>
            Login
          </NavLink>
          <NavLink key={'002'} to={'/register'}>
            SignUp
          </NavLink>
          <NavLink key={'003'} to={'/jokes'}>
            Jokes
          </NavLink>
          <button onClick={() => {
            localStorage.clear();
            setToken()
          }}>
            SignOut
          </button>
        </div>

          <Route 
          exact path='/'
          render={props => {
            if(!token){
              return (<SignUp 
              mode={'logIn'} 
              setLogin={setLogin}
              onLogin={onLogin}
              login={login}/>)
            } else {
              return (<Jokes jokes={jokes} />)
            }
          }} 
          />
          <Route 
          exact path='/register'
          render={props => {
            if(!token){  
            return (<SignUp 
                mode={'signUp'}
                setLogin={setLogin}
                onRegister={onRegister}
                login={login}/>)
              } else {
                return (<Jokes jokes={jokes} />)
              }
          }} />
          <Route 
          exact path='/jokes'
          render={props => {
            if (token) {
              return (<Jokes jokes={jokes} />)
            }
          return <Redirect to='/' />
          }} />
        
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

function SignUp({ mode, setLogin, login, onLogin, onRegister }){

  return(<>
    <div className='form'>
            <p>Username: </p><input
              onChange={(e) => setLogin({
                ...login,
                username: e.target.value
              })}
            ></input>
            <p>Password: </p><input
              type='password'
              onChange={(e) => setLogin({
                ...login,
                password: e.target.value
              })}
            ></input>
            <button
              onClick={
                mode==='logIn' ? 
                onLogin :
                onRegister
              }
            >{mode==='logIn' ? 'LogIn': 'Register'}</button>
          </div>
  </>);
}

export default App;
