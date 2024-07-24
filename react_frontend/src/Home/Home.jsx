import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

const Home = () => {

  return (
    <>
      <Container fluid>
        <Button outline color='primary' >
          <Link to={"/customerslisting"}>Customers</Link>
        </Button>{' '}
      </Container>     
    </>
  );
}

export default Home;