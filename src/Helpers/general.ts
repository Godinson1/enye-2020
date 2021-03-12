import {
  LOADING_CLINIC,
  LOADING_MEDICAL,
  LOADING_PHARMACY,
  LOADING_HOSPITAL,
} from "../actions/types";

const getUserMessage = () => {
  var data = [
      [22, "It's bed time, Get some sleep."],
      [16, "Good evening, Stay safe!"],
      [12, "Good afternoon, Wash your hands."],
      [5, "Good morning, Great day!"],
      [0, "Working late? Try rest!"],
    ],
    hr = new Date().getHours();
  for (var i = 0; i < data.length; i++) {
    if (hr >= data[i][0]) {
      return `${data[i][1]}`;
    }
  }
};

const getLoadingType = (query: string) => {
  return query === "hospital"
    ? LOADING_HOSPITAL
    : query === "clinic"
    ? LOADING_CLINIC
    : query === "medical"
    ? LOADING_MEDICAL
    : query === "pharmacy"
    ? LOADING_PHARMACY
    : "LOADING";
};

export { getUserMessage, getLoadingType };
