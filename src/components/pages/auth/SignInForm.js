import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./SignInUpForm.module.css";
import btnStyles from "../../../assets/styles/Button.module.css";
import appStyles from "../../../App.module.css";
import { useSetCurrentUser } from "../../../contexts/CurrentUserContext";

import axios from "axios";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  const location = useLocation();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const { data } = await axios.post("/dj-rest-auth/login/", signInData);
        const user = data.user;
        user['is_admin'] = data.is_admin
        localStorage.setItem("is_admin",data.is_admin)
        setCurrentUser(user);
        if(data.is_admin == true)        
            navigate('/admin',{replace:true}, { state: { activeTab: 0 } });        
        else
        {
          if(location.state == null)
            navigate('/products',{replace:true});
          else
            navigate('/checkout',{replace:true});
        }
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
      <Row data-testid="signin-page" className={`${styles.Row} ${styles.SignInUp}`}>
        <Col className="my-auto py-2 p-md-2" md={{span:6, offset:3}}>
          <Container className={`${styles.SpecificBoder} p-4 `} style={{backgroundColor:'#f3f3f3'}}>
            <h1 className={styles.Header}>sign in</h1>
            {errors?.non_field_errors ? errors?.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                  {message}
                </Alert>
              )) : errors?.password &&
              errors?.password?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                  {message} <span className="text-danger">password</span>
                </Alert> ))
            }
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  data-testid="username"
                  className={styles.Input}
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  data-testid="password"
                  className={styles.Input}
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                type="submit"
                data-testid="signin-button"
              >
                Sign in
              </Button>
            </Form>
          </Container>
          <Container className={`mt-3 ${appStyles.Content}`}>
            <Link className={styles.Link} to="/signup" data-testid="signup-link">
              Don't have an account? <span>Sign up now!</span>
            </Link>
          </Container>
        </Col>
      </Row>
  );
}

export default SignInForm;