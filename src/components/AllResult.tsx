import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import getDistance from "geolib/es/getDistance";
import { withRouter, RouteComponentProps } from "react-router";
import { Divider, Rate, Tooltip, Empty, Button, Pagination, Input } from "antd";
import {
  HeatMapOutlined,
  CarOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { getSearchedData } from "../actions/resultAction";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Navbar from "./Navbar";
import "./styles/all.css";

//Retrieve RouteComponent props from react-router
type SomeComponentProps = RouteComponentProps;
const AllResult: React.FC<SomeComponentProps> = ({
  history,
  location,
}: RouteComponentProps) => {
  const [page, setPage] = useState<number | undefined>(1);
  const [pagination, setPagination] = useState<number>(10);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filterData, setFilterData] = useState([]);
  //Access global state to handle user experience
  const state: RootStateOrAny = useSelector((state) => state);
  const dispatch = useDispatch();

  const requestData = {
    page,
    pagination,
  };
  const handleSearch = (e: any) => {
    setLoading(true);
    setSearch(e.target.value);
    setLoading(false);
  };

  const { Search } = Input;

  useEffect(() => {
    dispatch(getSearchedData(requestData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, page]);

  useEffect(() => {
    if (state.users.all && state.users.all.data) {
      const data = state.users.all.data.filter((data: any) => {
        return data.name.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(data);
    }
  }, [search, state.users.all]);

  console.log(filterData);

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
  }, [dispatch]);

  useEffect(() => {
    if (state.users.all && state.users.all.data) {
      setFilterData(state.users.all);
    }
  }, [dispatch, state.users.all]);

  //Format Date search was created using the dayjs plugin
  dayjs.extend(relativeTime);

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
              {state.users && state.users.all && state.users.all.data ? (
                <div>
                  <div>
                    <ArrowLeftOutlined
                      onClick={() => history.goBack()}
                      size={150}
                    />
                    <h1 className="search-feature-title">SEARCHED RESULTS</h1>
                    <div>
                      <div>
                        <span id="base-text">
                          Showing - {state.users.all.data.length} /{" "}
                          {state.users.all.total_result}
                        </span>
                      </div>
                      <div>
                        {" "}
                        <Search
                          placeholder="Filter result here"
                          size="large"
                          loading={loading}
                          onChange={handleSearch}
                          id="search"
                        />
                      </div>
                    </div>

                    <br />
                  </div>
                  <div className="flex-wrap">
                    {state.users &&
                      state.users.all &&
                      state.users.all.data &&
                      state.users.all.data.map((data: any, index: number) => (
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
                                          >
                                            <HeatMapOutlined />
                                          </Link>
                                        </Tooltip>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="searchTime">
                            <div>
                              <small id="period">
                                Searched - {dayjs(data.createdAt).fromNow()}
                              </small>
                            </div>

                            <div className="base-top">
                              <small className="bases-text">
                                <b>Located @:</b> {""}
                                {data.vicinity}.
                              </small>
                            </div>
                            <div className="base-top">
                              <small className="bases-text">
                                <CarOutlined /> {""}
                                You are{" "}
                                <span
                                  style={{
                                    color: "purple",
                                    fontFamily: "Roboto",
                                  }}
                                >
                                  {getDistance(
                                    {
                                      latitude: latitude + "",
                                      longitude: longitude + "",
                                    },
                                    {
                                      latitude: data.lat + "",
                                      longitude: data.lng + "",
                                    }
                                  )}{" "}
                                  meters
                                </span>{" "}
                                away from {data.name}.
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    <div className="flex-between">
                      <div></div>
                      <div>
                        <Pagination
                          size="small"
                          total={state.users.all.total_result}
                          showSizeChanger
                          onShowSizeChange={(current, size) =>
                            setPagination(size)
                          }
                          onChange={(page, pageSize) => setPage(page)}
                          current={page}
                          pageSize={pagination}
                          pageSizeOptions={["5", "10", "20", "30", "50", "100"]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="nodata">
                  <div>
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
