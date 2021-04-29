export const populate = (entry, index) => {
    return {
        type: "POPULATE",
        payload: entry,
        index: index
    };
};

export const del = () => dispatch => {
    dispatch(
        {
            type: "DELETE"
        }
    );
    return Promise.resolve();
    
}
