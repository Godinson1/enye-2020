import React, { useState, useEffect } from 'react';
import { Select, Input, Modal, Spin, Button, Form, AutoComplete } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import img from './images/imgs.png';
import { Search, logOut } from './actions/resultAction';
import { withRouter,  RouteComponentProps } from "react-router";
import { myFunc } from './Helpers/autocomplete'
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import { USER_DETAIL } from './actions/types';


//Retrieve RouteComponent props from react-router
type SomeComponentProps = RouteComponentProps;

//Main Home Functional Component
const Home : React.FC<SomeComponentProps> = ({history} : RouteComponentProps) => {

    //Get dispatch hook for dispatching actions and also access state
    const dispatch : any = useDispatch();
    const answer : any = useSelector(state => state);


    //Create interface for State - defining object types
    interface State  {
        latitude: number,
        longitude: number,
    }

    
    //Ensure user's data is persisted - case of on reload
      useEffect(() => {
        auth.onAuthStateChanged((userAuth: any) => {
            if(userAuth) {
              const details = {
                userId: userAuth.uid,
                email:  userAuth.email
              }
              dispatch({ type: USER_DETAIL, payload: details });
            } 
        });
      }, []);

    
    //ALl states for storing values
    const [state, setState] = useState<State>({
    latitude: 0,
    longitude: 0,
    });
    const [connection, setConnection] = useState<boolean>(false);
    const [internet, setInternet] = useState<boolean>(false);
    const [options, setOptions] = useState<{ value: string }[]>([]);

  
    //Use-Effect (React-Hook) for retrieving user's current location on 
    //component mount
      useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
                  setState(state => ({ 
                    ...state, 
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                 }));
        },
        error => {
            console.log("Error getting coordinates", error);
        });
      }, [])

      
      //Validate Select (km) dropdown
      const validateMessages = {
        required: 'Select distance!',
      };

      //Implement autocomplete based on app's criteria with an helper function
      //myFunc
      const handleSearch = (value: string) => {
        setOptions(
          !value ? [] : [{ value }, { value: myFunc(value) }],
        );
      };

     
      //Get values from form and also userId from state
      //Check if user is online and connected to the internet then dispatch
      //Search Action
      const onFinish = (values : any) => {
          const data = {
              query: values.query.query,
              latitude: state.latitude,
              longitude: state.longitude,
              distance: values.distance.distance.value,
              userId: answer.users.user.userId
          }
          if ( navigator.onLine) {
              fetch('https://www.google.com/', { // Used Google because of good uptime
                  mode: 'no-cors',
              })
              .then(() => {
                dispatch(Search(data, history));
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


      //Destructure Option from Select
      const { Option } = Select;

    
    return (
        <div>
        <div className="main-view-overlay">
        <div className="header">
        <div className="main-view">
        <div className="head">
            <li className="logo1">
              <h1>closeSearch</h1>
            </li>
            <li className="logo1" style={{ float: "left", padding: "10px 20px 0 200px" }}>
              {answer && answer.users && answer.users.error ?  (<span style={{ color: "red", fontSize: "1.4em" }}>
                {answer.users.error.error}
              </span>) : ('')}
            </li>
            <li className="logo1" style={{ float: "right", padding: "9px 20px 0 0" }}>
            <Form onFinish={onFinish} validateMessages={validateMessages}>
                <Input.Group compact>
                    <Form.Item name={['distance', 'distance']} rules={[{ required: true }]}>
                      <Select 
                        labelInValue
                        className="select"
                        placeholder="Select Km"
                        >
                        <Option value="1000">1km</Option>
                        <Option value="2000">2km</Option>
                        <Option value="4000">4km</Option>
                        <Option value="5000">5km</Option>
                        <Option value="10000">10km</Option>
                        <Option value="15000">15km</Option>
                        <Option value="20000">20km</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name={['query', 'query']} >
                      <AutoComplete
                        options={options}
                        style={{ width: 400, borderColor: 'purple' }}
                        onSearch={handleSearch}
                        className="auto-complete"
                      >
                        <Input 
                          placeholder="Search hospitals, clinics, pharmacies & medical offices" 
                          className="input"
                          required
                        />
                      </AutoComplete>
                    </Form.Item>
                    <Form.Item >
                      <Button className="btn" htmlType="submit"
                      disabled={answer && answer.users && answer.users.loading}>
                      {answer && answer.users && answer.users.loading ? 
                              <Spin style={{ color: "purple" }} size="small"/> : 'Search'}
                      </Button>
                    </Form.Item>
                </Input.Group>
            </Form>
            </li>
        </div>
        <div className="cover">
            <div className="so">
            <div>
            <h1 className="h1-header">Search  <span className="span">Aid</span> Closer to You</h1>
            <p id="p-header">Find hospitals, clinics, pharmacies and medical offices near you
            <br/></p>
            <p className="b-header">
              <Link to="/user-result">
              <Button size="large" shape="round"
                id="btn-all"
              >
                 My Searched Results
              </Button>
              </Link>           
            </p>
            </div>
            <div className="image">
            <img src={img} alt="closeSeach"/>
            </div></div>
            <p className="footer" onClick={() => dispatch(logOut(history))}>
              {answer && answer.users && answer.users.user ? (
                <span style={{ fontStyle: "italic" }}>
               {answer.users.user.email} - Logout
               </span>
              ): ('closeSearch - Joseph Godwin (Enye)')}
              
            </p>
            
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
            </div><div></div>
            </div></div></div>
        </div>
    );
}


export default withRouter(Home);