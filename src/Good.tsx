import React, { useState, useEffect } from 'react';
import { Typography, Select, Input, Modal, Button } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {UPDATED, LOADING, LOADING_STOP} from './actions/types';
import axios from 'axios';



let autoComplete: any;

interface State  {
    latitude: number,
    longitude: number,
}


  const Good : React.FC = () => {
    const dispatch : any = useDispatch();
    const answer : any = useSelector(state => state);
      const [status, setStatus] = useState<string>('start');
      const [query, setQuery] = useState("");
      const [data, dataSet] = useState<any>(null);
      const [state, setState] = useState<State>({
        latitude: 0,
        longitude: 0,
      });
      const [modalVisible, setModalVisible] = useState<boolean>(false)
      const [connection, setConnection] = useState<boolean>(false);
      const [internet, setInternet] = useState<boolean>(false);
      const [messageDetails, setMessageDetails] = useState<string>('');
      const [distance, setDistance] = useState<number>(1);



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

    
    const { Option } = Select;
    const { Title } = Typography;
    const handleChange = (value: any) : void => setDistance(value.value);


    const getHospital = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();
        getHospitals();
    }

    const getHospitals = async () : Promise<any> => {
        dispatch({ type: LOADING });
        const URL2 : string = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${state.latitude},${state.longitude}&radius=${distance}000&type=hospital&keyword=${query}&key=AIzaSyDvcWuLE2-FSF3MYCCGV8cZ0jsDDyxaliU`;
      try {
          const res : any = await axios.get(`https://cors-anywhere.herokuapp.com/${URL2}`)
          dispatch({
              type: UPDATED,
              payload: res.data.results
          })
          dispatch({ type: LOADING_STOP });
          console.log(res.data.results);
      } catch(e) {
          console.log(e);
      }
  }

  const handleCriteriaChange = (e: React.FormEvent<HTMLInputElement>) => {
      setQuery(e.currentTarget.value);
    };


      return (
        <div>
            <div className="main-view">
            <li className="logo1"><h1 className="logo">closeSearch</h1></li>
            <li className="logo1" style={{ float: "right" }}><h1 className="logo"><EnvironmentOutlined /></h1></li>
            <div className="main-view-overlay">
            <div className="header">
            <div>
            <h1 className="h1-header">Find <span className="span">Close</span> Hospitals</h1>
            <Input.Group compact>
            <input 
            onChange={handleCriteriaChange}
            placeholder="Search hospitals close to you" 
            className="input"
            />
            <Select 
                labelInValue
                className="select"
                onChange={handleChange}
                placeholder="Select Km"
                >
                <Option value="2">2km</Option>
                <Option value="4">4km</Option>
                <Option value="5">5km</Option>
                <Option value="10">10km</Option>
                <Option value="15">15km</Option>
                <Option value="20">20km</Option>
            </Select>
            <Button className="button" shape="round"
             size="large" onClick={getHospital} disabled={answer && answer.users && answer.users.loading}>
                 Search
            </Button>
            </Input.Group>
            <p className="footer">closeSearch - Joseph Godwin (Enye)</p>
            <Modal
                title="Hi there, Find address below and Stay Safe!"
                centered
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
                >
                <Title level={3}>Searched Address </Title>
                <p>{messageDetails}</p>
            </Modal>
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

  export default Good;