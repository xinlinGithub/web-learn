const axios = require('axios') 
const Util = {
    imgPath: '/img/',
    apiPath: '/apis/'
}
Util.ajax = axios.create({
    baseURL: Util.apiPath
})

Util.ajax.interceptors.response.use(res => {
    return res.data;
})

Util.getTodayTime = function () {
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
}
Util.prevDay = function (timestamp = (new Date()).getTime()) {
    console.log(timestamp)
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return year + '' + month + '' + day
}
export default Util