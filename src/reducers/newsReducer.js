const newsReducer = (state = [], action) => {
    switch (action.type) {
        case "POPULATE":
            return {...state,
                [action.index]: action.payload
            }
        case "DELETE":
            return {}
        default:
            return state;
    }
}

export default newsReducer;