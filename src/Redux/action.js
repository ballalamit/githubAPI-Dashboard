

export const getRepositories = (payload, page) => {
    return (dispatch) => {
       dispatch({ type: "GET_REPOSITORIES", payload : {payload, page} });
    };
 }

 export const appendData = (payload) => {
    return (dispatch) => {
       dispatch({ type: "APPEND_DATA", payload });
    };
 }

export const loading = () => {
    return (dispatch) => {
    dispatch( {type: "LOADING"});
    };
}


export const gotError = () => {
    return (dispatch) => {
    dispatch( {type: "ERROR"});
    };
}