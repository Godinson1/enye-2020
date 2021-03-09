import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Form, Input, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Register as RegisterUser } from "../actions/resultAction";
import "./styles/auth.css";

//Retrieve RouteComponent props from react-router
type SomeComponentProps = RouteComponentProps;
const Register: React.FC<SomeComponentProps> = ({
  history,
}: RouteComponentProps) => {
  //UseDispatch - for dispatching actions
  const dispatch = useDispatch();

  //Access global state to handle user experience
  const state: any = useSelector((state) => state);

  //State for storing values
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  //Register User
  const register = () => {
    const data = { email, password };
    dispatch(RegisterUser(data, history));
  };

  //Cancel error alert
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e, "I was closed.");
  };

  console.log(onClose);
  return (
    <div>
      <div className="auth-container">
        <div className="first-side">
          <div className="image-container">
            <img id="img" src="/assets/images/phoneOne.jpeg" alt="auth" />
            <div className="after">
              <div className="message">
                <div>
                  <h1 className="header-title">CLOSE SEARCH</h1>
                  <p className="header-desc">
                    Find hospitals, clinics and medical offices close to you
                    without hassle.
                  </p>
                  <div className="flex">
                    <Link to="/signup">
                      <div className="button-container">
                        <button id="btn">Get Started</button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="second-side">
          <div>
            <h3 className="title">REGISTER</h3>
            <div style={{ marginTop: "-20px", fontSize: "1rem" }}>
              <span></span>
            </div>
          </div>
          <div>
            <div style={{ marginTop: "20px" }}>
              <h4>BEGIN WITH THE CLOSE SEARCH AID</h4>
            </div>
            <div className="form-container">
              {state && state.users && state.users.error_login ? (
                <Alert
                  message="Login Error"
                  description={state.users.error_login}
                  type="error"
                  closable
                  style={{
                    width: "75%",
                    display: "inline-block",
                    fontSize: "1.2em",
                  }}
                  onClose={onClose}
                />
              ) : (
                ""
              )}

              <Form>
                <div style={{ width: 300 }}>
                  <label>First Name</label>
                  <Input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    value={firstName}
                    defaultValue=""
                    required
                    placeholder="Enter first name"
                  />
                </div>
                <div style={{ marginTop: "5px" }}>
                  <label>Last Name</label>
                  <Input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    value={lastName}
                    defaultValue=""
                    required
                    placeholder="Enter last name"
                  />
                </div>
                <div style={{ marginTop: "5px" }}>
                  <label>Email</label>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    value={email}
                    defaultValue=""
                    required
                    placeholder="Enter email address"
                  />
                </div>
                <div style={{ marginTop: "5px" }}>
                  <label>Password</label>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    value={password}
                    defaultValue=""
                    required
                    placeholder="Enter password"
                  />
                </div>

                <div
                  style={{
                    marginTop: "10px",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    disabled={
                      firstName === "" ||
                      lastName === "" ||
                      email === "" ||
                      password === ""
                        ? true
                        : false
                    }
                    style={{ backgroundColor: "purple", color: "white" }}
                    htmlType="submit"
                    onClick={() => register()}
                  >
                    Register
                  </Button>
                </div>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <h3>
                    Already have an account?{" "}
                    <Link id="link" to="/login">
                      Login Here..
                    </Link>
                  </h3>
                </div>
              </Form>
            </div>
            <div className="footer auth">
              <p className="footer-text">CLOSEAID - &copy; 2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
