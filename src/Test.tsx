import React, { useState, useEffect, useRef } from 'react';
import { Typography, Select, Input, Modal, Spin, Button } from 'antd';
import { EnvironmentOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {UPDATED, CLEAR, LOADING, NO_RESULT} from './actions/types';



const Test : React.FC = () => {


    const dispatch : any = useDispatch();
    const answer : any = useSelector(state => state);

    if(answer && answer.users && answer.users.details) {
        console.log(answer.users.details.map((item: any) => item.name));
    }

    interface State  {
        latitude: number,
        longitude: number,
    }

      const [query, setQuery] = useState("");
      const [state, setState] = useState<State>({
        latitude: 0,
        longitude: 0,
      });
      const [modalVisible, setModalVisible] = useState<boolean>(false)
      const [connection, setConnection] = useState<boolean>(false);
      const [internet, setInternet] = useState<boolean>(false);
      const [messageDetails, setMessageDetails] = useState<string>('');
      const [message, setMessage] = useState<string>('');
      const [distance, setDistance] = useState<number>(1);
      const inputRef = useRef<HTMLInputElement>(null);

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
            console.log(res.data.results);
        } catch(e) {
            console.log(e);
        }
    }

    const handleCriteriaChange = (e: React.FormEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value);
      };


    const perform = (name: string, address: string) : any => {
        setMessageDetails(address);
        setMessage(name);
        setTimeout(() => {
            setModalVisible(true);
        }, 2000)
    }


    const getLocation = () : void => {
    if("geolocation" in navigator) {
        console.log("Available")
    } else {
        return;
    }
    }

    const reSearch = () : void => {
    setModalVisible(false);
    setQuery("");
    dispatch({ type: CLEAR });
    }

    
    const { Option } = Select;
    const { Title } = Typography;
    const handleChange = (value: any) : void => setDistance(value.value);

    
    return (
        <div>
             <div className="main-view">
            <li className="logo1"><h1 className="logo">closeSearch</h1></li>
            <li className="logo1" style={{ float: "right" }}><h1 className="logo"><EnvironmentOutlined onClick={getLocation}/></h1></li>
            <div className="main-view-overlay">
            <div className="header">
            <div>
            <h1 className="h1-header">Find <span className="span">Close</span> Hospitals</h1>
            <Input.Group compact>
            <input 
            ref={inputRef}
            placeholder="Search hospitals close to you" 
            className="input"
            onChange={handleCriteriaChange}
            value={query}
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
            <Button className="btn" shape="round"
             size="large" onClick={getHospital} disabled={answer && answer.users && answer.users.loading}>
                 Search
            </Button>
            </Input.Group>
                <div className="cover">
                {answer && answer.users && answer.users.loading ? (<Spin style={{color: "purple"}} className="spinner" size="large" />) : (
                <div>{answer && answer.users ? answer && answer.users && answer.users.details && answer.users.details.map((item: any) => {
                return <div className="results"> 
                <div className="main" onClick={() => perform(item.name, item.address)}>
                    <p id="text">
                    <img src={item.icon} /> &nbsp; &nbsp;
                    <span id="name">{item.name}</span><RightOutlined className="arrow"/> <span id="address">{item.vicinity}</span>
                    </p>
                    <li className="add">Rating - {item.rating}</li>
                    <li className="add">Users Rating - {item.user_ratings_total}</li>
                    </div> </div>
                }): answer.users && answer.users.message === "Ooops No Resutlt Found!" ? <p>Ooops No Resutlt Found!"</p> : ''}</div>
                )}
            </div>
            <p className="footer">closeSearch - Joseph Godwin (Enye)</p>
            <Modal
                title="Hi there, Find address below and Stay Safe!"
                centered
                visible={modalVisible}
                footer={null}
                onCancel={() => reSearch()}
                >
                <Title level={3}>{message} </Title>
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

export default Test;