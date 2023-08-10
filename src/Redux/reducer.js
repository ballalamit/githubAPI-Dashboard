

const initialValue = {
    repositories: [],
    isloading: false,
    error: false

}

const reducer = (state= initialValue, action) => {
    switch (action.type) {
        case "LOADING":
            return{
                    ...state,
                    isloading: true,
                }
        case "GET_REPOSITORIES":
            return{
                    ...state,
                    isloading: false,
                    // repositories: action.payload,
                    repositories: action.payload.page === 1 ? action.payload.payload : [...state.repositories, ...action.payload.payload],
                    error:false
                }
        case "ERROR":
            return{
                    ...state,
                    error:true,
                    isloading: false,
                }
        case "APPEND_DATA":
            return{
                ...state,
                isloading: false,
                repositories:[...state.repositories,action.payload ] ,
                error:false
                }
    
        default:
            return state;
    }
}


export default reducer;