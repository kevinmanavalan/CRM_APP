import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar/NavBar';
import { Button, Container } from 'reactstrap';
import Home from './Home/Home';
import CustomerListing from './Customer/CustomerListing';

function App() {

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/customers' element={<CustomerListing/>}/>
      </Routes>
    </Router>
  );
}

export default App;
