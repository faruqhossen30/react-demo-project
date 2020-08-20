import React, { Component, useState } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Home from './pages/Home'
import Header from './pages/Header'
import Menu from './pages/Menu'
import SinglePost from './components/SinglePost'
import Footer from './pages/Footer'
import Products from './pages/Products'

const App = () => {
  const [keyword, setKeyword] = useState('')
  const [postid, setPostid] = useState(null)

  const keywordHandaler = (event) => {
    return setKeyword(event.target.value)
  }

  const getPostID = (ID) => {
    return setPostid(ID)
  }
  // For gatagory posts
  const [catagoryid, setCatagoryid] = useState('')
  const [id, setID] = useState(false)

  const catagoryIDHandaler = (ID) => {
    return setCatagoryid(ID), setID(true)
  }
  return (
    <Router>
      <>
        <Header />
        <Menu keywordHandaler={keywordHandaler} catagoryIDHandaler={catagoryIDHandaler}/>

        <Switch>
          <Route path='/:id' exact >
            <SinglePost postid={postid} />
          </Route>
          <Route path='/products/:id' >
            <Products catagoryid={catagoryid} id={id} catagoryIDHandaler={catagoryIDHandaler} keyword={keyword} getPostID={getPostID} />
          </Route>
          <Route path='/header'>
            <Header />
          </Route>
          <Route path='/' exact>
            <Home keyword={keyword} postid={postid} getPostID={getPostID} />
          </Route>
        </Switch>
        <Footer />
      </>
    </Router>
  )

}

export default App;
