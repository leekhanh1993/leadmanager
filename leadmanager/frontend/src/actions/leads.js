import axios from 'axios'
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from './types'

//GET LEADS
export const getLeads = () => dispatch => {
    axios.get("/api/leads/")
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

//DELETE LEAD
export const deleteLead = (id) => dispatch => {
    axios.delete(`/api/leads/${id}/`, {
        headers: {
            "X-CSRFToken": csrftoken
        }
    })
        .then(res => {
            dispatch({
                type: DELETE_LEAD,
                payload: id
            })
        })
        .catch(err => console.log(err))
}

//ADD LEAD
export const addLead = (newLead) => dispatch => {
    axios.post(`/api/leads/`, newLead, {
        headers: {
            "X-CSRFToken": csrftoken
        }
    })
        .then(res => {
            dispatch({
                type: ADD_LEAD,
                payload: res.data
            })
        })
        .catch(err => {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        })
}