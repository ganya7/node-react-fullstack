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

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
}

export const submitSurvey = (values,history) => async dispatch=> {
    const res = await axios.post('/api/surveys',values);

    history.push('/surveys');
    // the dispatch is to receive the data from the backend in the previous axios.post
    // and in the backend we process the data and send the updated user model
    dispatch({type: FETCH_USER, payload: res.data});
    // return {type: 'submit_survey'};
};
