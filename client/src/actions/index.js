import axios from "axios";
import { FETCH_USER } from "./type";

export const fetchUser = () => (dispatch) => {
  axios.get("/api/current_user").then((res) => {
    dispatch({
      type: FETCH_USER,
      payload: res,
    });
  });
};
