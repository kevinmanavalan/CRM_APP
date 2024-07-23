import { Link } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar/NavBar';
import { Button, Container } from 'reactstrap';

const Home = () => {

  return (
    <>
      <NavBar/>
      <Container fluid>
        <Button color='primary' outline>
          <Link to={"/customers"}>Customers</Link>
        </Button>
      </Container>     
    </>
  );
}

export default Home;