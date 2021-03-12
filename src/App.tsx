import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import {
  Home,
  Result,
  Login,
  AllResult,
  NotFound,
  Main,
  Faq,
  MapLocal,
  Signup,
} from "./components";

import store from "./store";
import AuthRoute from "./ProtectedRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Modal } from "antd";
require("dotenv").config();

const App: React.FC = () => {
  const [internet, setInternet] = useState(false);
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    const checkConnection = () => {
      if (navigator.onLine) {
        fetch("https://www.google.com/", {
          // Used Google because of good uptime
          mode: "no-cors",
        })
          .then(() => {})
          .catch(() => {
            setInternet(true);
          });
      } else {
        //Set connection message after 3 seconds
        setTimeout(() => {
          setConnection(true);
        }, 5000);
        return null;
      }
    };
    checkConnection();
  }, [internet]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        console.log("Error getting coordinates", error);
      }
    );
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={Home} />
            <AuthRoute path="/home" component={Home} />
            <AuthRoute path="/main" component={Main} />
            <AuthRoute path="/all" component={AllResult} />
            <AuthRoute path="/faq" component={Faq} />
            <AuthRoute exact path="/result" component={Result} />
            <AuthRoute exact path="/maps" component={MapLocal} />
            <AuthRoute component={NotFound} />
          </Switch>
        </Router>
        <div>
          <Modal
            title="Connectivity Issue"
            centered
            visible={connection}
            footer={null}
            onCancel={() => setConnection(false)}
          >
            <p>Ensure you are connected to the internet and try again!</p>
          </Modal>
          <Modal
            title="No Internet"
            centered
            visible={internet}
            footer={null}
            onCancel={() => setInternet(false)}
          >
            <p style={{ fontFamily: "Roboto" }}>
              Kindly Turn on WiFi or Data connection and try again!
            </p>
          </Modal>
        </div>
      </div>
    </Provider>
  );
};

export default App;
