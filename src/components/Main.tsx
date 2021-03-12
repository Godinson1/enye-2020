import React, { useState, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";

import {
  Button,
  Tabs,
  Switch,
  Tooltip,
  Divider,
  Empty,
  Radio,
  Select,
} from "antd";

import {
  getUserMessage,
  HOSPITAL,
  MEDICAL,
  CLINIC,
  PHARMACY,
} from "../Helpers";
import { Search } from "../actions/resultAction";
import Navbar from "./Navbar";
import "./styles/main.css";

//Retrieve RouteComponent props from react-router
type SomeComponentProps = RouteComponentProps;
const Main: React.FC<SomeComponentProps> = ({
  history,
  location,
}: RouteComponentProps) => {
  const [Location, setLocation] = useState<boolean>(false);
  const [hospital, setHospital] = useState<number>(0);
  const [pharmacy, setPharmarcy] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [medical, setMedical] = useState<number>(0);
  const [clinic, setClinic] = useState<number>(0);
  const [radius, setRadius] = useState<string>("");

  const dispatch = useDispatch();
  const state: RootStateOrAny = useSelector<RootStateOrAny>(
    (state) => state.users
  );

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

  const { TabPane } = Tabs;

  const { Option } = Select;

  const makeRequest = (query: string, radiusCheck: number) => {
    const requestData = {
      query,
      latitude,
      longitude,
      distance: radiusCheck === 1 ? 1000 : parseInt(radius),
    };
    dispatch(Search(requestData, history));
  };

  console.log(Location);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="search-info-container">
          <div className="first-container">
            <div className="flex-between">
              <div>
                <h1 className="titles">Joseph, </h1>
                <div className="desc-cont">
                  <span className="desc">{getUserMessage()}&#128075;</span>
                </div>
              </div>
              <div>
                <Tooltip
                  title={location ? "Turn off Location" : "Turn on Location"}
                >
                  <Switch
                    className="switch"
                    onChange={() => setLocation(!location)}
                  />
                </Tooltip>
              </div>
            </div>
            <div>
              <div className="search-feature">
                <h1 className="search-feature-title">SEARCH FEATURES</h1>
                <Divider className="divider" />
              </div>
              <div className="flex">
                <div className="feature-container">
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
                            <h1 className="title-feature">HOSPITALS</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="feature-content">
                    <div>
                      <Radio.Group
                        onChange={(e) => setHospital(e.target.value)}
                        value={hospital}
                      >
                        <div className="flex-between">
                          <Radio value={1}>General</Radio>
                          <Radio value={2}>Custom</Radio>
                        </div>
                      </Radio.Group>
                    </div>
                    {hospital === 2 ? (
                      <div>
                        <label>Select proximity</label>
                        <div>
                          <Select
                            defaultValue="Select"
                            style={{ width: 120 }}
                            onChange={(value) => setRadius(value)}
                          >
                            <Option value="1000">1000cm</Option>
                            <Option value="2000">2000cm</Option>
                            <Option value="3000">3000cm</Option>
                            <Option value="4000">4000cm</Option>
                          </Select>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="feature-content-btn">
                      <Button
                        disabled={
                          hospital === 0
                            ? true
                            : hospital === 2 && radius === ""
                            ? true
                            : false
                        }
                        className="btn"
                        onClick={() => makeRequest(HOSPITAL, hospital)}
                      >
                        {state.loading_hosptal ? "Loading..." : "Search"}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="feature-container">
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
                            <h1 className="title-feature">PHARMACIES</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="feature-content">
                    <div>
                      <Radio.Group
                        onChange={(e) => setPharmarcy(e.target.value)}
                        value={pharmacy}
                      >
                        <div className="flex-between">
                          <Radio value={1}>General</Radio>
                          <Radio value={2}>Custom</Radio>
                        </div>
                      </Radio.Group>
                    </div>
                    {pharmacy === 2 ? (
                      <div>
                        <label>Select proximity</label>
                        <div>
                          <Select
                            defaultValue="Select"
                            style={{ width: 120 }}
                            onChange={(value) => setRadius(value)}
                          >
                            <Option value="1000">1000cm</Option>
                            <Option value="2000">2000cm</Option>
                            <Option value="3000">3000cm</Option>
                            <Option value="4000">4000cm</Option>
                          </Select>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="feature-content-btn">
                      <Button
                        disabled={pharmacy === 0 ? true : false}
                        className="btn"
                        onClick={() => makeRequest(PHARMACY, pharmacy)}
                      >
                        {state.loading_pharmacy ? "Loading..." : "Search"}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="feature-container">
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
                            <h1 className="title-feature">CLINICS</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="feature-content">
                    <div>
                      <Radio.Group
                        onChange={(e) => setClinic(e.target.value)}
                        value={clinic}
                      >
                        <div className="flex-between">
                          <Radio value={1}>General</Radio>
                          <Radio value={2}>Custom</Radio>
                        </div>
                      </Radio.Group>
                    </div>
                    {clinic === 2 ? (
                      <div>
                        <label>Select proximity</label>
                        <div>
                          <Select
                            defaultValue="Select"
                            style={{ width: 120 }}
                            onChange={(value) => setRadius(value)}
                          >
                            <Option value="1000">1000cm</Option>
                            <Option value="2000">2000cm</Option>
                            <Option value="3000">3000cm</Option>
                            <Option value="4000">4000cm</Option>
                          </Select>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="feature-content-btn">
                      <Button
                        disabled={clinic === 0 ? true : false}
                        className="btn"
                        onClick={() => makeRequest(CLINIC, clinic)}
                      >
                        {state.loading_clinic ? "Loading..." : "Search"}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="feature-container">
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
                            <h1 className="title-feature">MEDICAL OFFICES</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="feature-content">
                    <div>
                      <Radio.Group
                        onChange={(e) => setMedical(e.target.value)}
                        value={medical}
                      >
                        <div className="flex-between">
                          <Radio value={1}>General</Radio>
                          <Radio value={2}>Custom</Radio>
                        </div>
                      </Radio.Group>
                    </div>
                    {medical === 2 ? (
                      <div>
                        <label>Select proximity</label>
                        <div>
                          <Select
                            defaultValue="Select"
                            style={{ width: 120 }}
                            onChange={(value) => setRadius(value)}
                          >
                            <Option value="1000">1000cm</Option>
                            <Option value="2000">2000cm</Option>
                            <Option value="3000">3000cm</Option>
                            <Option value="4000">4000cm</Option>
                          </Select>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="feature-content-btn">
                      <Button
                        disabled={medical === 0 ? true : false}
                        className="btn"
                        onClick={() => makeRequest(MEDICAL, medical)}
                      >
                        {state.loading_medical ? "Loading..." : "Search"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer auth">
              <p className="footer-text">CLOSEAID - &copy; 2021</p>
            </div>
          </div>
          <div className="second-container">
            <Tabs defaultActiveKey="1">
              <TabPane tab="SEARCH HISTORY" key="1" style={{ color: "purple" }}>
                <div className="history-container">
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 60,
                    }}
                    description={<h4>NO SEARCHED RESULTS FOUND</h4>}
                  >
                    <Button className="btn">Create Now</Button>
                  </Empty>
                </div>
              </TabPane>
              <TabPane tab="TRENDING" key="2">
                <div className="history-container">
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 60,
                    }}
                    description={<h4>NO TRENDING RESULTS FOUND</h4>}
                  >
                    <Button className="btn">Create Now</Button>
                  </Empty>
                  ,
                </div>
              </TabPane>
              <TabPane tab="FAVOURITES" key="3">
                <div className="history-container">
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 60,
                    }}
                    description={<h4>NO FAVOURITE RESULTS FOUND</h4>}
                  >
                    <Button className="btn">Create Now</Button>
                  </Empty>
                  ,
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Main);
