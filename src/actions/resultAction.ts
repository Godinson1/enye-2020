//Imported Types, packages and helpers
import { RouteComponentProps } from "react-router";
import { LOADING, SEARCH, ERROR, GET_RESULT } from "./types";
import axios from "axios";
import { PRODUCTION_SEARCH_ENDPOINT, getLoadingType } from "../Helpers";
import store from "../store";

interface requestData {
  query: string;
  latitude: number;
  longitude: number;
  distance: number;
}

//Handle Search request
export const Search = (
  data: requestData,
  history: RouteComponentProps["history"]
) => async (dispatch: any) => {
  const LOADING_TYPE = getLoadingType(data.query);
  dispatch({ type: LOADING_TYPE });
  const token = localStorage.getItem("auth-token");
  try {
    const response = await axios.post(
      `${PRODUCTION_SEARCH_ENDPOINT}/search`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: SEARCH,
      payload: response.data.data,
    });
    history.push(`/result?query=${data.query}`);
  } catch (err) {
    if (err.response) {
      dispatch({
        type: ERROR,
        payload: err.response.data,
      });
    }

    console.log(err.response);
  }
};

interface searchedData {
  page: number | undefined;
  pagination: number;
}

//Retrieve Search data
export const getSearchedData = (data: searchedData) => async (
  dispatch: typeof store.dispatch
) => {
  dispatch({ type: LOADING });
  const token = localStorage.getItem("auth-token");
  try {
    const response = await axios.post(`${PRODUCTION_SEARCH_ENDPOINT}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    dispatch({
      type: GET_RESULT,
      payload: response.data,
    });
  } catch (err) {
    console.log(err.response);
    if (err.response) {
      dispatch({
        type: ERROR,
        payload: err.response.data,
      });
    }
  }
};
