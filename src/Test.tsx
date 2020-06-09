import React, { useState, useEffect } from 'react';
import { Select, Input, Modal, Spin, Button, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import img from './images/imgs.png';
import { Search, Results } from './actions/resultAction';
import { withRouter,  RouteComponentProps } from "react-router";


type SomeComponentProps = RouteComponentProps;

const Test : React.FC<SomeComponentProps> = ({history} : RouteComponentProps) => {


    const dispatch : any = useDispatch();
    const answer : any = useSelector(state => state);

    interface State  {
        latitude: number,
        longitude: number,
    }

    

    const [query, setQuery] = useState("");
    const [state, setState] = useState<State>({
    latitude: 0,
    longitude: 0,
    });
    const [connection, setConnection] = useState<boolean>(false);
    const [internet, setInternet] = useState<boolean>(false);
  

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

      
      const validateMessages = {
        required: 'Select distance!',
      };
      
     
      const onFinish = (values : any) => {
          console.log(values.query.query);
          console.log(values.distance.distance.value);
          const data = {
              query: values.query.query,
              latitude: state.latitude,
              longitude: state.longitude,
              distance: values.distance.distance.value
          }
        if ( navigator.onLine) {
            fetch('https://www.google.com/', { // Check for internet connectivity
                mode: 'no-cors',
            })
            .then(() => {
              dispatch(Search(data, history));
            }).catch(() => {
               setInternet(true);
            });
        } else {
            setTimeout(() => {
                setConnection(true);
            }, 3000)
          return null;
        } 
        };
      

    const handleCriteriaChange = (e: React.FormEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value);
      };
    
    const { Option } = Select;

    
    return (
        <div>
        <div className="main-view-overlay">
        <div className="header">
            <div className="main-view">
        <div className="head">
            <li className="logo1"><h1>closeSearch</h1></li>
            <li className="logo1" style={{ float: "left", padding: "10px 20px 0 300px" }}>
              {answer && answer.users && answer.users.error ?  (<span style={{ color: "red", fontSize: "1.4em" }}>
                {answer.users.error}
              </span>) : ('')}
            </li>
            <li className="logo1" style={{ float: "right", padding: "5px 20px 0 0" }}>
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
      <Input 
        placeholder="Search" 
        className="input"
        onChange={handleCriteriaChange}
        value={query}
        required
        />
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
              <Button size="large" shape="round"
                id="btn-all" onClick={() => dispatch(Results(history))}
                disabled={answer && answer.users && answer.users.loading_results}
            >
              {answer && answer.users && answer.users.loading_results ? 
                (<span style={{ fontStyle: "italic" }}>Retrieving.. <Spin style={{ color: "purple" }} size="small"/></span>) : ('See Searched Results')}  
            </Button>
            {answer && answer.users && answer.users.error_result ?
              <small style={{ color: "red", fontSize: "1.4em" }}>  {answer.users.error_result.message}.. Search to start a thread!</small> : ''
            }
            </p>
            </div>
            <div className="image">
            <img src={img} alt="closeSeach"/>
            </div></div>
            <p className="footer">closeSearch - Joseph Godwin (Enye)</p>
            
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

export default withRouter(Test);