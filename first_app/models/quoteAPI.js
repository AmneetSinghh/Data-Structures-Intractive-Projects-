// We need a API 
const axios = require('axios'); // api for the random quotes;
const uri = "htt://api.quotable.io/random";


module.exports = getData = () => {
        return axios.get(uri).then(response => response.data.content.split(" "));
    }
    // it will return the array of words because we used a split method.