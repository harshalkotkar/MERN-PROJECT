import React, { createContext, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Logout from './components/Logout';
import "./App.css"
import {initialState, reducer } from '../src/reducer/UseReducer';


export  const userContext = createContext();

  const Routing = () => {
    return (
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/logout">
        <Logout />
      </Route>

    </Switch>
  )
  }
  function App() {
  const [state, dispatch] = useReducer(reducer, initialState)



  return (
    <>
<userContext.Provider value = {{state, dispatch}}>
      <Navbar />
      <Routing />
</userContext.Provider>
  </>   
      )
}

      export default App

