import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Typography, Select, Input, Modal, Spin } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';
import { locationCheck } from './Helpers/location'
import { useDispatch, useSelector } from 'react-redux'
import {UPDATED} from './actions/types'
import useOnclickOutside from "react-cool-onclickoutside";


const Test : React.FC = () => {

    const dispatch : any = useDispatch();
    const answer : any = useSelector(state => state);

    interface State  {
        latitude: number,
        longitude: number,
    }

    interface Result  {
        name: string,
        address: string,
    }

    interface Mode {
        typing: any,
        query: string
    }

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


      const [status, setStatus] = useState<boolean>(false);
      const [typing, setTyping] = useState<number>(0);
      const [query, setQuery] = useState("");
      const [data, dataSet] = useState<any>(null);
      const [state, setState] = useState<State>({
        latitude: 0,
        longitude: 0,
      });
      const [mode, setMode] = useState<Mode>({
        query: "",
        typing: 0,
      });
      const [modalVisible, setModalVisible] = useState<boolean>(false)
      const [connection, setConnection] = useState<boolean>(false);
      const [internet, setInternet] = useState<boolean>(false);
      const [messageDetails, setMessageDetails] = useState<string>('');
      const [message, setMessage] = useState<string>('');
      const [distance, setDistance] = useState<number>(1);
      const ref = useRef<HTMLInputElement>(null);

      const getHospitals = async (param: string) : Promise<any> => {
        console.log("called...")
        setStatus(true);
        try {
            const res : any = await axios.get(`https://cors-anywhere.herokuapp.com/${param}`)
            dispatch({
                type: UPDATED,
                payload: res.data.results
            })
            console.log(res.data.results);
            setStatus(false);
        } catch(e) {
            console.log(e);
        }
    }

    useOnclickOutside(ref, () => {
       window.location.reload();
      });

      const perform = (name: string, address: string) : any => {
          console.log(name);
          console.log(address);
            setMessageDetails(address);
            setMessage(name);
            setTimeout(() => {
                setModalVisible(true);
            }, 2000)
      }


      const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          var query: string = e.target.value;
           if(typing) {
            clearTimeout(typing);
           }
           mode.typing = setTimeout(() => {
            console.log("ready to use..")
            console.log(query)
            const URL2 : string = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${state.latitude},${state.longitude}&radius=${distance}000&type=hospital&keyword=${query}&key=AIzaSyDvcWuLE2-FSF3MYCCGV8cZ0jsDDyxaliU`;
            //const URL: string = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=query=hospitals+in+${query}&location=${state.latitude},${state.longitude}&radius=${distance}000&strictbounds&key=AIzaSyDvcWuLE2-FSF3MYCCGV8cZ0jsDDyxaliU`;
            setTimeout(() => {
                if(query == "") {
                    return null;
                } else {
                e.preventDefault();
                    if ( navigator.onLine) {
                    fetch('https://www.google.com/', { // Check for internet connectivity
                        mode: 'no-cors',
                    })
                    .then(() => {
                        setTimeout(() => {
                            getHospitals(URL2);
                        }, 1000);
                    }).catch(() => {
                        setConnection(true);
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    });
                    } else {
                        setInternet(true);
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    }
                }
            }, 3000)
            }, 4000)
          
      }

        console.log(mode.query);
    
        const { Option } = Select;
        const { Title } = Typography;
        const handleChange = (value: any) : void => setDistance(value.value);


      const getLocation = () : void => {
        if("geolocation" in navigator) {
            console.log("Available")
        } else {
          locationCheck();
        }
     }

     const reSearch = () : void => {
        setModalVisible(false);
        window.location.reload();
     }
    


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
            //ref={autoCompleteRef}
            placeholder="Search hospitals close to you" 
            className="input"
            onChange={handleQuery}
           
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
            </Input.Group>
            <div className="cover" >
                {status ? (<Spin style={{color: "purple"}} className="spinner" size="large" />) : (
                <div>{answer && answer.users && answer.users.details && answer.users.details.map((data: any) => {
                    return <div className="results" key={data.place_id}>
                        <p onClick={() => perform(data.name, data.vicinity)}  id="text">{data.name} - <span className="address">{data.vicinity}</span></p>
                    </div>
                })}</div>
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