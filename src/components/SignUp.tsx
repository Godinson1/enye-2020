import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { Form, Input, Button, Alert, Spin, Modal, Divider, Card } from 'antd'
import {  UserOutlined, LockOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { withRouter,  RouteComponentProps } from "react-router";
import { Register } from '../actions/resultAction'




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
    const onFinish = (values: any) => {

        //values in email and password variables respectively
        const email = values.email;
        const password = values.password;
        const data = { email, password };

        //Check for connectivity and dispatch action
        if (navigator.onLine) {
          fetch('https://www.google.com/', { // Used Google because of good uptime
              mode: 'no-cors',
          })
          .then(() => {
            dispatch(Register(data, history));
          }).catch(() => {
          setInternet(true);
          });
        } else { //Set connection message after 3 seconds
        setTimeout(() => {
            setConnection(true);
        }, 3000)
        return null;
        } 
             
    };
   
    

    //Cancel error alert
    const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(e, 'I was closed.');
    };
  
    
      return (
        <div>
        <div className="login-forms">
        <div className="logins">
        <h1 style={{ color: "purple", fontSize: "4em" }}>closeSearch</h1>
          <Divider style={{ height: '15px' }}>
            <span style={{ fontSize: '1em', fontStyle: 'italic' }}>
              Find hospitals, clinics, medical offices and pharmacies near you
            </span>
          </Divider>
          <div className="site-card-border-less-wrapper">
            <Card title={<EnvironmentOutlined className="icon"/>} bordered={false} style={{ width: 600 }}>
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
             <h1 style={{ color: "purple", fontSize: "2em" }}>Sign Up</h1>
            <Form
            name="normal_login"
            className="auth"
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
          <Button id="btn-form" size="large" shape="round" 
          disabled={state && state.users && state.users.loading_user}
          htmlType="submit" >
                {state && state.users && state.users.loading_user ? (
                  (<span style={{ fontStyle: "italic" }}>
                    Registering.. <Spin style={{ color: "purple" }} size="small"/>
                  </span>)
                ): ('Sign Up')}
              </Button>
          </Form.Item>
          <Link to="/">
              <span style={{ color: "purple" }}>
                  Aleady Registered? Sign In
              </span>
          </Link>
        </Form>
            </Card>
          </div>
        
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