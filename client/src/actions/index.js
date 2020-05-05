import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./type";
import history from "../history";

export const fetchUser = () => (dispatch) => {
  axios.get("/api/current_user").then((res) => {
    dispatch({
      type: FETCH_USER,
      payload: res.data,
    });
  });
};

export const handleToken = (token) => (dispatch) => {
  axios
    .post("/api/stripe", token)
    .then((res) => dispatch({ type: FETCH_USER, payload: res.data }));
};

export const submitSurvey = (values) => async (dispatch) => {
  const res = await axios.post("/api/surveys", values);
  dispatch({ type: FETCH_USER, payload: res.data });
  history.push("/surveys");
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
