import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Dogdetails from './components/Dogdetails';
// import { Filter } from './components/Filter.tsx';

const App = () => {
  return (
    <div className="App">
      <Router>
        {/* <Link to="/">Home</Link> */}
        <Route exact path="/" component={Home} />
        <Route path="/dogs/:id" component={Dogdetails} /> 
      </Router>
    </div>
  );
}

export default App;
