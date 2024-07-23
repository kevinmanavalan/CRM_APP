import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { Button, Container } from 'reactstrap';

const Home = () => {

  return (
    <>
      <Container fluid>
        <Button color='primary' outline>
          <Link to={"/customerslisting"}>Customers</Link>
        </Button>
      </Container>     
    </>
  );
}

export default Home;