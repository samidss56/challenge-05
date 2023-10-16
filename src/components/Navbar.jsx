import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Navbar,
  Nav,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";

const NavbarComponent = ({ onSearchResults }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  const search = async (q) => {
    if (q.length > 3) {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/search/movie?page=1&query=${q}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        onSearchResults(response.data.data); 
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const logout = (event) => {
    event.preventDefault();

    localStorage.removeItem("token");

    window.location.replace("/");
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data } = response.data;

        setUser(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error?.response?.data?.message);
          return;
        }
        alert(error?.message);
      }
    };

    getMe();
  }, []);

  return (
    <>
      <Navbar
        className="navbar"
        bg="trasnparent navbar-expand-lg fixed-top p-2"
      >
        <Container fluid>
          <Navbar.Brand className="logo text-danger mx-4" as={Link} to={"/"}>
            <h2>
              <strong style={{ marginLeft: "3.7rem" }}>MovieList</strong>
            </h2>
          </Navbar.Brand>
          <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="Movie-search mr-sm-2"
                  onChange={({ target }) => search(target.value)}
                  variant="outline-danger"
                  style={{ background: "transparent", color: "white" }}
                ></Form.Control>
              </Col>
            </Row>
          </Form>
          <Nav className="buttons">
            {user ? (
              <>
                <Nav.Link as={Link} to="/" style={{ color: "white" }}>
                  {user?.name}
                </Nav.Link>
                <Button
                  onClick={logout}
                  style={{ marginRight: "4.8rem", color: "white" }}
                  variant="outline-danger"
                  className="logout"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-danger"
                  className="login"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
                <Button
                  variant="danger"
                  className="register"
                  style={{ marginRight: "4.8rem" }}
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Login show={showLogin} onHide={() => setShowLogin(false)} />
      <Register show={showRegister} onHide={() => setShowRegister(false)} />
    </>
  );
};

NavbarComponent.propTypes = {
  onSearchResults: PropTypes.func.isRequired,
};

export default NavbarComponent;
