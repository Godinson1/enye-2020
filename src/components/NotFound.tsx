import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "./styles/auth.css";

//Retrieve RouteComponent props from react-router
type SomeComponentProps = RouteComponentProps;
const Register: React.FC<SomeComponentProps> = ({
  history,
}: RouteComponentProps) => {
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="second-side">
          <div>
            <h3 className="title">PAGE NOT FOUND</h3>
            <div style={{ marginTop: "-20px", fontSize: "1rem" }}>
              <span></span>
            </div>
          </div>
          <div>
            <div style={{ marginTop: "20px" }}>
              <h4>
                Seems the page you are looking for does not exists or you might
                have typed incorrectly.
              </h4>
            </div>
          </div>
          <div
            style={{
              marginTop: "100px",
              textAlign: "center",
              marginBottom: "150px",
            }}
          >
            <div>
              <Link id="link" to="/home">
                <Button
                  style={{ backgroundColor: "purple", color: "white" }}
                  htmlType="submit"
                >
                  Go back Home
                </Button>
              </Link>
            </div>
          </div>
          <div className="footer auth">
            <p className="footer-text">CLOSEAID - &copy; 2021</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
