import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Form, Input, Button, Alert, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { LogIn } from "../actions/auth";
import "./styles/auth.css";

//Retrieve RouteComponent props from react-router
type SomeComponentProps = RouteComponentProps;
const NewHome: React.FC<SomeComponentProps> = ({
  history,
}: RouteComponentProps) => {
  //UseDispatch - for dispatching actions
  const dispatch = useDispatch();

  //Access global state to handle user experience
  const state: RootStateOrAny = useSelector((state) => state);

  //State for storing values
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(
    localStorage.getItem("user-email") || ""
  );
  const [password, setPassword] = useState<string>(
    localStorage.getItem("user-password") || ""
  );

  //Sign In User
  const login = () => {
    const data = { email, password };
    dispatch(LogIn(data, history, rememberMe));
  };

  //Cancel error alert
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e, "I was closed.");
  };

  console.log(onClose);
  return (
    <div>
      <div className="auth-container">
        <div className="login-first-side">
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="login-second-side">
          <div>
            <h3 className="title">LOGIN</h3>
            <div style={{ marginTop: "-20px", fontSize: "1rem" }}>
              <span></span>
            </div>
          </div>
          <div>
            <div style={{ marginTop: "20px" }}>
              <h4>WELCOME BACK</h4>
            </div>
            <div className="form-container">
              {state && state.users && state.users.error_login ? (
                <Alert
                  message=""
                  description={state.users.error_login}
                  type="error"
                  closable
                  style={{
                    width: "82%",
                    display: "inline-block",
                    fontSize: "1.2em",
                  }}
                  onClose={onClose}
                />
              ) : (
                ""
              )}
              <Form>
                <label>Email</label>
                <div style={{ width: 300 }}>
                  <Input
                    placeholder="Enter email address"
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    value={email}
                    defaultValue=""
                    required
                  />
                </div>
                <div style={{ marginTop: "5px" }}>
                  <label>Password</label>
                  <Input
                    placeholder="Enter password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <div style={{ marginTop: "5px" }}>
                  <Checkbox
                    onChange={() => setRememberMe(!rememberMe)}
                    value={rememberMe}
                    checked={localStorage.getItem("user-email") ? true : false}
                  >
                    Remember me
                  </Checkbox>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <Button
                    disabled={email === "" || password === "" ? true : false}
                    style={{ backgroundColor: "purple", color: "white" }}
                    onClick={() => login()}
                  >
                    {state && state.users && state.users.loading_user
                      ? "Loading..."
                      : "Login"}
                  </Button>
                </div>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <h3>
                    Don't have an account?{" "}
                    <Link id="link" to="/signup">
                      Register Here..
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

export default withRouter(NewHome);
