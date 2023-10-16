import { useState } from "react";
import { Modal, Form, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

function Register(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = {
        name,
        email,
        password,
      };

      let config = {
        method: "post",
        url: "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      };

      const response = await axios.request(config);

      // console.log("API Response:", response.data);

      // const { token } = response.data.data;

      localStorage.setItem("token", response.data.data.token);

      props.onHide();

      window.location.replace("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} className="register-modal">
      <Modal.Header closeButton className="me-4">
        <Modal.Title className="ms-4">Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="p-4">
          <Row className="mb-4">
            <Col>
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-form w-100"
                  />
                  <Form.Text className="text-muted">
                    We wont share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="name-form w-100"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="password-form w-100"
                  />
                </Form.Group>
                <Button
                  variant="outline-danger"
                  type="submit"
                  className="register-form"
                >
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

Register.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default Register;
