import axios from 'axios'
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from './types'
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from "./auth"

//GET LEADS
export const getLeads = () => (dispatch, getState) => {
    axios.get("/api/leads/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//DELETE LEAD
// headers: {
//     "X-CSRFToken": csrftoken
// }
export const deleteLead = (id) => (dispatch, getState) => {
    axios.delete(`/api/leads/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteLead: 'Lead Deleted' }))
            dispatch({
                type: DELETE_LEAD,
                payload: id
            })
        })
        .catch(err => console.log(err))
}

//ADD LEAD
export const addLead = (newLead) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios.post(`/api/leads/`, newLead, tokenConfig(getState))
            .then(res => {
                dispatch(createMessage({ addLead: 'Lead Added' }))
                dispatch({
                    type: ADD_LEAD,
                    payload: res.data
                })
                resolve(true)
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
    })
}