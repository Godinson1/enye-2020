import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Typography, Select, Input, Modal } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { locationCheck, loadScript, URL } from './Helpers/location'


let autoComplete: any;

interface State  {
    latitude: number,
    longitude: number,
}


  var my_script = loadScript(URL);

  const Good : React.FC = () => {
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
      const autoCompleteRef = useRef<HTMLInputElement>(null);


      const setScript = useCallback(async () => {
        let response = await do_load()
        dataSet(response)
      }, [])

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
        setScript()
    }, [setScript])

    
    const { Option } = Select;
    const { Title } = Typography;
    const handleChange = (value: any) : void => setDistance(value.value);


    const handleScriptLoad =(
         autoCompleteRef: any, 
         latitude: number,
         longitude: number,
         distance: number
         ) : void => {

        var circle = new window.google.maps.Circle({ center: new window.google.maps.LatLng(latitude, longitude), radius: distance * 1000 })
        
        autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { 
        bounds: circle.getBounds(),
        types: ["establishment"], 
        strictBounds: true       
        },
      );
      autoComplete.setFields(["address_components", "formatted_address"]);
      autoComplete.addListener("place_changed", () =>
        handlePlaceSelect()
      );
    }


    async function handlePlaceSelect() {
        if ( navigator.onLine) {
            fetch('https://www.google.com/', { // Check for internet connectivity
                mode: 'no-cors',
            })
            .then(() => {
                const addressObject = autoComplete.getPlace();
                const query = addressObject.formatted_address;
                setMessageDetails(query);
                setModalVisible(true);
                setQuery("");  
            }).catch(() => {
               window.location.reload();
            });
            } else {
                return null;
            }
        
      }

      const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if ( navigator.onLine) {
        fetch('https://www.google.com/', { // Check for internet connectivity
            mode: 'no-cors',
        })
        .then(() => {
            setTimeout(() => {
                if(state.longitude && state.latitude) {
                    handleScriptLoad(
                        autoCompleteRef, 
                        state.latitude,
                        state.longitude,
                        distance
                    );
                } else {
                    console.log("Error calling variables")
                }
                }, 1000);
        }).catch(() => {
           setConnection(true);
        });
        } else {
            setInternet(true);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
       
      }

      const getLocation = () : void => {
          if("geolocation" in navigator) {
              console.log("Available")
          } else {
            locationCheck();
          }
      }


      const do_load = () => {
        my_script.then(() => {
          setStatus('done');
        }).catch(function() {
          setStatus('error');
        })
      }

      console.log(status, query, data);

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
            ref={autoCompleteRef}
            placeholder="Search hospitals close to you" 
            className="input"
            onFocus={handle}
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