import { Alert, Button, Form, Col, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts.js";
import { Navigate } from "react-router-dom";
import AuthenticationAPI from "../APIs/AuhtAPI.jsx";

function LoginForm() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("andrea@test.com");
  const [password, setPassword] = useState("andrea");

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      return;
    }

    AuthenticationAPI.loginAPI(username, password)
      .then(async (response) => {
        const data = await response.json();

        if (response.status === 200) setUser(data);
        else {
          setUser(null);
        }
      })
      .catch((error) => {
        setUser(null);
      });
  };

  return user ? (
    <Navigate to="/new-ticket" />
  ) : (
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label column="lg">Email</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Enter email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label column="lg">Password</Form.Label>
        <Form.Control
          size="lg"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button
        type="submit"
        size="lg"
        variant="outline-primary"
        className="float-end"
        id="login-button"
        onClick={handleLoginSubmit}
      >
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;
