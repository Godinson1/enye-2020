import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { Form, Input, Button, Alert, Spin, Modal } from 'antd'
import {  UserOutlined, LockOutlined } from '@ant-design/icons'
import { withRouter,  RouteComponentProps } from "react-router";
import { signInError, isEmail } from './Helpers/firebase'
import { auth } from './firebase'
import { ERROR_SIGNUP, USER_LOADING, SET_AUTHENTICATED } from './actions/types'



//Retrieve RouteComponent props from react-router
type SomeComponentProps = RouteComponentProps;


//Main SignUp Functional Component
const SignUp : React.FC<SomeComponentProps> = ({history} : RouteComponentProps) => {

    //UseDispatch - for dispatching actions
    const dispatch = useDispatch();

    //Access state to handle user experience
    const state : any = useSelector(state => state);

    //State for storing values
    const [connection, setConnection] = useState<boolean>(false);
    const [internet, setInternet] = useState<boolean>(false);


    //Signup User
    const onFinish = useCallback(async (values: any) => {

      //Dispatch loading user on button click and store form
      //values in emaila and password variables respectively
        dispatch({ type: USER_LOADING });
        const email = values.email;
        const password = values.password;

        //Check if valid email - If true, return error else check
       //if user is online and connected to the internet
       //If connected, Sign up user else return connection message
        const isValidEmail = isEmail(email);
        if(!isValidEmail) {
            dispatch({
                type: ERROR_SIGNUP,
                payload: 'Must be a valid email address'
            })
        } else {
            if ( navigator.onLine) {
                fetch('https://www.google.com/', { // Used Google because of good uptime
                    mode: 'no-cors',
                })
                .then( async () => {
                    try {
                        await auth.createUserWithEmailAndPassword(email, password);
                        dispatch({ type: SET_AUTHENTICATED });
                        history.push('/home');
                    } catch(err) {
                        console.log(err);
                        dispatch({
                            type: ERROR_SIGNUP,
                            payload: signInError(err.code, email)
                        });
                    }
                }).catch(() => {
                  setInternet(true);
                });
            } else { //Set connection message after 3 seconds
              setTimeout(() => {
                  setConnection(true);
              }, 3000)
              return null;
            } 
        }
    
    },[history]);
   
    

    //Cancel error alert
    const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(e, 'I was closed.');
    };
  
    
      return (
        <div>
        <div className="login-form">
        <div className="logins">
        <h1 style={{ color: "purple", fontSize: "4em" }}>closeSearch - Sign Up</h1>
          {state && state.users && state.users.error_signup ? 
            (
              <Alert
                message="Sign Up Error"
                description={state.users.error_signup}
                type="error"
                closable
                style={{ width: '50%', display: "inline-block", fontSize: "1.5em" }}
                onClose={onClose}
              />
            ) : ('')
          }
        <Form
          name="normal_login"
          className="inputs"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

          <Form.Item >
          <Button id="btn" size="large" shape="round" htmlType="submit" >
                {state && state.users && state.users.loading_user ? (
                  (<span style={{ fontStyle: "italic" }}>
                    Registering.. <Spin style={{ color: "purple" }} size="small"/>
                  </span>)
                ): ('Log in')}
              </Button>
          </Form.Item>
          <Link to="/">
              <span style={{ color: "purple" }}>
                  Aleady Registered? Sign In
              </span>
          </Link>
        </Form>
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
                <p>Kindly Turn on WiFi or Data connection and try again!</p>
          </Modal>
        </div>
        </div>
        </div>
      );
};


export default withRouter(SignUp);