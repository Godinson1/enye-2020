//Imported Types, packages and helpers
import { LOADING, SEARCH, ERROR, GET_RESULT } from "./types";
import axios from "axios";
import { LOCAL_SEARCH_ENDPOINT } from "../Helpers";
import store from "../store";

//Handle Search request
export const Search = (data: Object, history: any) => async (dispatch: any) => {
  dispatch({ type: LOADING });
  const token = localStorage.getItem("auth-token");
  try {
    const response = await axios.post(`${LOCAL_SEARCH_ENDPOINT}/search`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    dispatch({
      type: SEARCH,
      payload: response.data.data,
    });
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
    const response = await axios.post(`${LOCAL_SEARCH_ENDPOINT}`, data, {
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
