import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import btnStyle from "../../../assets/styles/Button.module.css";
import styles from "./SignInUpForm.module.css"
import appStyles from "../../../App.module.css"
import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import SignUp from '../../../assets/images/sign_up.WebP'
import axios from "axios";
import { useSetCurrentUser } from "../../../contexts/CurrentUserContext";
import { axiosRes } from "../../../api/axiosDefault";
const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});
  const setCurrentUser = useSetCurrentUser();

  const navigate = useNavigate();

  const signInForFirstTime = async ()=>{
    try{
      const signInData = ({username: signUpData.username, password: signUpData.password1})
    const { data } = await axiosRes.post("/dj-rest-auth/login/", signInData);
    setCurrentUser(data.user);
    navigate('/profile/'+data.user.profile_id)
    }catch(err)
    {

    }
  }
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("dj-rest-auth/registration/", signUpData);
      signInForFirstTime()
      // navigate("/signin",{replace:true});
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div className={styles.SignInUp} data-testid="signup-page">
    <Row className={`${styles.Row}`}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
                data-testid="username_signup"
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
                data-testid="password1_signup"

              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
                data-testid="password2_signup"

              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyle.Button} ${btnStyle.Wide} ${btnStyle.Bright}`}
              type="submit"
              data-testid="signup-button"
            >
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin" data-testid="signin-link">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={SignUp}
        />
      </Col>
    </Row>
    </div>
  );
};

export default SignUpForm;