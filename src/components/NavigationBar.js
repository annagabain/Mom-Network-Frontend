import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
  return (
    <Navbar expand="lg">
      <Container>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Feed</Nav.Link>
            <NavDropdown title="Groups" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Baby</NavDropdown.Item>
              <NavDropdown.Item href="#">Toddler</NavDropdown.Item>
              <NavDropdown.Item href="#">Small Child</NavDropdown.Item>
              <NavDropdown.Item href="#">Healthcare</NavDropdown.Item>
              <NavDropdown.Item href="#">Activities</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">My Network</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;