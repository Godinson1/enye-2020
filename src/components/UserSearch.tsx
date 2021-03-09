import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Avatar, Modal, Divider, Spin } from "antd";
import getDistance from "geolib/es/getDistance";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "@apollo/react-hooks";
import { GET_PLACE } from "../Schemas/graphql_schema";
import { auth } from "../firebase";
import { USER_DETAIL } from "../actions/types";

//Define types for state with Message interface
interface Message {
  name: string;
  vicinity: string;
  user_lat: string;
  user_rating: number;
  rating: number;
  user_lng: string;
  icon: any;
  lat: string;
  lng: string;
}

//Define types for state with State interface
interface State {
  latitude: number;
  longitude: number;
}

const UserSearch: React.FC = () => {
  //Receive User's Id from Global State
  const result: any = useSelector((state) => state);
  const dispatch = useDispatch();

  //On component mount, Get User's coordinates
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setState((state) => ({
          ...state,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => {
        console.log("Error getting coordinates", error);
      }
    );
  }, []);

  //Ensure user's data is persisted - case of on reload
  useEffect(() => {
    auth.onAuthStateChanged((userAuth: any) => {
      if (userAuth) {
        const details = {
          userId: userAuth.uid,
          email: userAuth.email,
        };
        localStorage.setItem("authUser", JSON.stringify(userAuth));
        dispatch({ type: USER_DETAIL, payload: details });
      } else {
        localStorage.removeItem("authUser");
      }
    });
  }, [dispatch]);

  //State for storing values
  const [messageDetails, setMessageDetails] = useState<Message>({
    name: "",
    vicinity: "",
    user_lat: "",
    user_rating: 0,
    rating: 0,
    user_lng: "",
    icon: "",
    lat: "",
    lng: "",
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [state, setState] = useState<State>({
    latitude: 0,
    longitude: 0,
  });

  //Retrieve User's Search by Current LoggedIn UserId
  const { loading, error, data } = useQuery(GET_PLACE, {
    variables: { id: result.users.user.userId },
  });

  //If results loading.. Show a spinner
  if (loading)
    return (
      <div id="load">
        <Spin style={{ color: "purple" }} size="large" />
      </div>
    );
  if (data && data.place.length === 0)
    return (
      <div id="load">
        <span id="no">Reload or Search to see results</span>
      </div>
    );
  if (error) {
    console.log(JSON.stringify(error));
    return (
      <div id="load">
        <h1>Something went wrong.. Reload again!</h1>
      </div>
    );
  }
  console.log(data);

  //Receive single details and trigger modal for more details
  const perform = (
    name: string,
    vicinity: string,
    icon: string,
    lat: string,
    lng: string,
    rating: number,
    user_rating: number,
    placeId: string
  ): any => {
    setMessageDetails((messageDetails) => ({
      ...messageDetails,
      name,
      vicinity,
      user_rating,
      rating,
      icon,
      lat,
      lng,
      user_lat: state.latitude.toString(),
      user_lng: state.longitude.toString(),
    }));
    setTimeout(() => {
      setModalVisible(true);
    }, 2000);
  };

  //Format Date search was created using the dayjs plugin
  dayjs.extend(relativeTime);

  //Destructured Title from Typography (Antd) for Heading
  const { Title } = Typography;

  //Return Tsx with Searched Results
  return (
    <div>
      <div className="main-view-overlay">
        <div className="header">
          <Title className="title">
            My Search Results - &nbsp;
            {data && data.place && data.place.length}
          </Title>
          <div className="cover">
            {data &&
              data.place &&
              data.place.map((data: any, index: number) => {
                return (
                  <div key={index} className="per">
                    <div className="results">
                      <div>
                        <p id="desc">
                          <Avatar src={data.icon} alt="img" />
                          <span id="text">{data.name}</span> <br />
                          <small id="add">Vicinity - {data.vicinity}</small>
                          <br />
                        </p>
                      </div>
                      <div className="btn-details">
                        <Button
                          className="btn"
                          shape="round"
                          size="large"
                          onClick={() =>
                            perform(
                              data.name,
                              data.vicinity,
                              data.icon,
                              data.lat,
                              data.lng,
                              data.rating,
                              data.userRating,
                              data.placeId
                            )
                          }
                        >
                          See details
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Divider>
                        <small id="period">
                          Searched - {dayjs(data.createdAt).fromNow()}
                        </small>
                      </Divider>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <Modal
            title="Hi there, Find details below and Stay Safe!"
            centered
            visible={modalVisible}
            footer={null}
            onCancel={() => setModalVisible(false)}
          >
            <Title level={3}>
              <Avatar src={messageDetails.icon} alt="img" />{" "}
              {messageDetails.name}{" "}
            </Title>
            <li className="detail">
              <b>Address - </b> {messageDetails.vicinity}
            </li>
            <li className="detail">
              <b>Rating - </b> {messageDetails.rating}
            </li>
            <li className="detail">
              <b>Users Rating - </b> {messageDetails.user_rating}
            </li>
            <li className="detail">
              <b>Distance</b> - You are{" "}
              {getDistance(
                {
                  latitude: messageDetails.user_lat + "",
                  longitude: messageDetails.user_lng + "",
                },
                {
                  latitude: messageDetails.lat + "",
                  longitude: messageDetails.lng + "",
                }
              )}{" "}
              meters away from {messageDetails.name}
            </li>
            <li className="detail">
              <b>Direction - </b> Check{" "}
              <Link
                to={`/maps?name=${messageDetails.name}&lat=${parseFloat(
                  messageDetails.lat
                )}&lng=${parseFloat(messageDetails.lng)}`}
              >
                here
              </Link>{" "}
              for direction to {messageDetails.name}
            </li>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
