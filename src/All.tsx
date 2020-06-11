import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Avatar, Modal } from 'antd';
import getDistance from 'geolib/es/getDistance';
import { Link } from 'react-router-dom';



interface Message {
    name: string, vicinity: string, user_lat: string,
    user_rating: number, rating: number, user_lng: string,
    icon: any, lat: string, lng: string
}

interface State  {
    latitude: number,
    longitude: number,
}




const All : React.FC = () => {

    const result : any = useSelector(state => state);

    if(result && result.users && result.users.all) {
        console.log(result.users.all);
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

    const [messageDetails, setMessageDetails] = useState<Message>({
        name: "", vicinity: "", user_lat: "",
        user_rating: 0, rating: 0, user_lng: "",
        icon: "", lat: "", lng: ""
      });
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [state, setState] = useState<State>({
        latitude: 0,
        longitude: 0,
        });

    const perform = (
        name: string, vicinity: string, icon: string,
        lat: string, lng: string, rating: number, user_rating: number,
        placeId: string
        ) : any => {
       setMessageDetails(messageDetails => ({
           ...messageDetails,
               name, vicinity,
               user_rating, rating,
               icon, lat, lng,
               user_lat: state.latitude.toString(),
               user_lng: state.longitude.toString()
       }));
       setTimeout(() => {
           setModalVisible(true);
       }, 2000)
   }
    

    const { Title } = Typography;

    return (
        <div>
            <div className="main-view-overlay">
            <div className="header">
            <Title className="title">Searched Results Found -
            {result && result.users && result.users.all && 
             result.users.all ? result.users.all.length : ''}
            </Title>
            <div className="cover">
            {result && result.users && result.users.all && 
             result.users.all.map((data: any) => {
               return <div key={data.placeId} className="results">
                    <div>
                        <p id="text"><Avatar src={data.icon} alt="img" />  {data.name} </p>
                    </div>
                    <div className="btn-details">
                        <Button className="btn" shape="round" size="large"
                        onClick={() => perform(
                            data.name, data.vicinity, data.icon, data.geometry.location.lat,
                            data.geometry.location.lng, data.rating, data.userRating, data.placeId
                            )}
                        >
                            See details
                        </Button>
                    </div>
                </div>
            })}
            </div></div>
            <div>
            <Modal
                title="Hi there, Find details below and Stay Safe!"
                centered
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <Title level={3}><Avatar src={messageDetails.icon} alt="img"/> {messageDetails.name} </Title>
                <li className="detail"><b>Address - </b>  {messageDetails.vicinity}</li>
                <li className="detail"><b>Rating - </b>  {messageDetails.rating}</li>
                <li className="detail"><b>Users Rating - </b>  {messageDetails.user_rating}</li>
                <li className="detail"><b>Distance</b> - You are {
                    getDistance(
                        { latitude: messageDetails.user_lat + '', longitude: messageDetails.user_lng + '' },
                        { latitude: messageDetails.lat + '',  longitude: messageDetails.lng + '' }
                    ) 
                } meters away from {messageDetails.name} 
                </li>
                <li className="detail"><b>Direction - </b> Check <Link to={`/maps?name=${messageDetails.name}&lat=${parseFloat(messageDetails.lat)}&lng=${parseFloat(messageDetails.lng)}`}>here</Link> for direction to {messageDetails.name}</li>
            </Modal>
            </div>
        </div></div>
    );
}

export default All;