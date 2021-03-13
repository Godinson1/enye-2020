import React, { useState, useEffect } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import getDistance from "geolib/es/getDistance";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Divider, Rate, Tooltip, Empty, Button } from "antd";
import queryString from "query-string";
import {
  ExclamationCircleOutlined,
  CarOutlined,
  EnvironmentOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import Navbar from "./Navbar";
import "./styles/all.css";

//Retrieve RouteComponent props from react-router
type SomeComponentProps = RouteComponentProps;
const AllResult: React.FC<SomeComponentProps> = ({
  history,
  location,
}: RouteComponentProps) => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  //Access global state to handle user experience
  const state: RootStateOrAny = useSelector((state) => state);

  //Access Place name, latitude and longitude from url
  const { query } = queryString.parse(location.search);

  const searchKey = query as string;
  console.log(state.users.details);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      },
      (error) => {
        console.log("Error getting coordinates", error);
      }
    );
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <div className="all">
        <div className="result-container">
          {state.users.loading ? (
            <div className="feature-content">
              <h1 className="bases">LOADING...</h1>
            </div>
          ) : (
            <div>
              {state.users && state.users.details ? (
                <div>
                  <div>
                    <ArrowLeftOutlined
                      onClick={() => history.goBack()}
                      size={150}
                    />
                    <h1 className="search-feature-title">SEARCHED RESULTS</h1>
                    <span id="base-text">
                      {state.users.details.length} Results Found
                    </span>
                    <br />
                    <span id="base-text">
                      Search Feature: <b>{searchKey}</b>
                    </span>
                  </div>
                  <div className="flex-wrap">
                    {state.users &&
                      state.users.details &&
                      state.users.details.map((data: any, index: number) => (
                        <div key={index} className="search-container">
                          <div className="feature-header">
                            <div className="image-container">
                              <img
                                id="img"
                                src="/assets/images/phoneOne.jpeg"
                                alt="hospital"
                              />
                              <div className="after">
                                <div className="message">
                                  <div>
                                    <h1 className="title-search">
                                      {data.name}
                                    </h1>
                                    <Divider className="divider" />
                                    <div className="flex-between">
                                      <div className="bases">
                                        <Rate
                                          allowHalf
                                          disabled
                                          defaultValue={data.rating}
                                        />
                                      </div>
                                      <div className="bases">
                                        <Tooltip
                                          title={"Check Map for Direction"}
                                        >
                                          <Link
                                            to={`/maps?name=${
                                              data.name
                                            }&lat=${parseFloat(
                                              data.lat
                                            )}&lng=${parseFloat(data.lng)}`}
                                            id="links"
                                          >
                                            <ExclamationCircleOutlined />
                                          </Link>
                                        </Tooltip>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="map-btn">
                            <div>
                              <div className="bases-container">
                                <p className="bases">
                                  <EnvironmentOutlined /> {""}
                                  {data.vicinity}.
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="bases">
                                <CarOutlined /> {""}
                                You are{" "}
                                {getDistance(
                                  {
                                    latitude: latitude + "",
                                    longitude: longitude + "",
                                  },
                                  {
                                    latitude: data.geometry.location.lat + "",
                                    longitude: data.geometry.location.lng + "",
                                  }
                                )}{" "}
                                meters away from {data.name}.
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="nodata">
                  <div className="hh">
                    <Empty
                      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      imageStyle={{
                        height: 60,
                      }}
                      description={<h4>NO RESULTS FOUND</h4>}
                    >
                      <Button
                        onClick={() => window.location.reload()}
                        className="btn"
                      >
                        REFRESH PAGE
                      </Button>
                    </Empty>
                    ,
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(AllResult);
