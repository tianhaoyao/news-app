export const populate = (entry) => {
    return {
        type: "POPULATE",
        payload: entry
    };
};

export const del = () => {
    return {
        type: "DELETE"
    };
}