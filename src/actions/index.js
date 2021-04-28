export const populate = (entry, index) => {
    return {
        type: "POPULATE",
        payload: entry,
        index: index
    };
};

export const del = () => {
    return {
        type: "DELETE"
    };
}