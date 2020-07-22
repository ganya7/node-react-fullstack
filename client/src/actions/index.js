import axios from "axios";
import { FETCH_USER } from "./types";


/*  //promise syntax
export const fetchUser = () => {
    return function (dispatch) {
        axios.get('/api/current_user')
            .then(res => dispatch({
                type: FETCH_USER, payload: res
            }));
    }
} */

// async await syntax
/* export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res });
} */
export const fetchUser = () => async dispatch => dispatch({ type: FETCH_USER, payload: await (await axios.get('/api/current_user')).data });
