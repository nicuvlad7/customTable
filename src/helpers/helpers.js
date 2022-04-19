export const prepareData = (rawData) => {
    return rawData.length ? rawData.map((data,index) => ( data.id ? data : {...data, id: `${index + 1000}`})) : [];
}