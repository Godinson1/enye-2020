import React, { useRef, useState, useEffect } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import {Select, Input, Modal} from 'antd';
import axios from 'axios';


const Home = () => {


    const [distance, setDistance] = useState<number>(1);
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [message, setMessage] = useState<string>('');
    const [countrySign, setCountrySign] = useState<string>('');
    const [modal2Visible, setModal2Visible] = useState<boolean>(false)
    const { Option } = Select;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_API_KEY}`)
                .then(response => {
                  const data = response.data.results[2].address_components[6].short_name;
                  console.log(data);
                  setCountrySign(data.toLowerCase());
                }).catch(err => console.log(err));
        },
        error => {
            console.log("Error getting coordinates", error);
        });
    }, []);


  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions 
  } = usePlacesAutocomplete({
    requestOptions: { 
        location: new google.maps.LatLng(latitude, longitude),
        radius: distance * 1000,
        componentRestrictions: {country: countrySign},
        //types: ['hospital']
        types: ['establishment']
     },
    debounce: 300
  });

  const ref = useRef<HTMLDivElement>(null);
  useOnclickOutside(ref, () => {
    clearSuggestions();
  });
 
  const handleInput =(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const handleChange = (value: any) : void => setDistance(value.value);
  const handleSelect = ({ description }: {description: any}) => () => {

    setValue(description, false);
    setMessage(description);
    setModal2Visible(true);
    clearSuggestions();
    setValue("");
  };
 
  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        id,
        structured_formatting: { main_text, secondary_text } 
      } = suggestion;
 
      return (
        <div className="result"
          key={id}
          onClick={handleSelect(suggestion)}
        >
          <div className="details">
          <strong className="main-text">{main_text}</strong> <small className="small-text">{secondary_text}</small>
        </div></div>
      );
    });
 
  return (
    <div className="main">
    <h1>Covid Symptoms? Search closest Hospitals..</h1>
    <br/>
    <div ref={ref}>
      <Input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search for hospitals"
        style={{ width: 500 }}
      />
      <Select 
        labelInValue
        style={{ width: 120 }}
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
      <br /><br />
      {status === 'OK' && <div className="search-area">{renderSuggestions()}</div>}
      <Modal
          title="Hi there, find address below and stay safe!"
          centered
          visible={modal2Visible}
          footer={null}
          onCancel={() => setModal2Visible(false)}
        >
         {message}
     </Modal>
    </div></div>
  );
};

export default Home;