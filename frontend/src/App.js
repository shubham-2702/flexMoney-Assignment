import './App.css';
import { Link, Route, Switch } from 'react-router-dom'
import * as bst from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Register from './pages/Register';
import UserInfo from './pages/UserInfo';
import Pay from './pages/Pay';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'

function App() {
  return (
    <>
      <main>
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Intern Assignment</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to={"/"}>Register</Link>{' '}</Nav.Link>
            <Nav.Link><Link to={"/pay"}>Pay</Link>{' '}</Nav.Link>
            <Nav.Link><Link to={"/getinfo"}>Get Info</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Switch>
          <Route exact path='/' component={Register} />
          <Route exact path='/pay' component={Pay} />
          <Route exact path='/getinfo' component={UserInfo} />
        </Switch>
      </main>
    </>
  );
}

export default App;
