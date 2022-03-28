import axios from 'axios';
// import Vue from "vue";
// import storeControl from '../store/index';

const baseUrl = process.env.VUE_APP_BASE_API;

axios.defaults.timeout = 30000; // Set the request timeout (MS) to no more than half a minute

axios.interceptors.request.use(function (config) {
  // storeControl.state.loadding = true; //Do something before the request is issued
  return config;
}, function (error) {
  return Promise.reject(error)
});

axios.interceptors.response.use(function (response) {
  // storeControl.state.loadding = false;//The returned data is processed here
  return response.data
}, function (error) {
  let errMsg = '';
  if (error.response) {
    // The request is executed and the server responds with a status code
    switch (error.response.status) {
      case 400:
        errMsg = 'Error request';
        break;
      case 401:
        errMsg = 'Unauthorized, please log in again';
        // localStorage.removeItem("token");
        // this.$message.error(errMsg);
        break;
      case 403:
        errMsg = 'access denied';
        // localStorage.removeItem("token");
        // this.$message.error(errMsg);
        break;
      case 404:
        errMsg = 'Request error, the resource was not found';
        break;
      case 405:
        errMsg = 'Request method not allowed';
        break;
      case 408:
        errMsg = 'request timeout';
        break;
      case 500:
        errMsg = 'Server side error';
        break;
      case 501:
        errMsg = 'Network not implemented';
        break;
      case 502:
        errMsg = 'network error';
        break;
      case 503:
        errMsg = 'Service Unavailable';
        break;
      case 504:
        errMsg = 'Network Timeout';
        break;
      case 505:
        errMsg = 'The request is not supported by the HTTP version';
        break;
      default:
        errMsg = 'Connection error';
    }
  } else {
    errMsg = "Failed to connect to the server";
  }

  return Promise.reject(errMsg);

});
export default {
  /**
   *
   * @param requestUrl  Interface address
   * @param params Interface parameters (object)
   * @returns {Q.Promise<any>}
   */
  post(requestUrl, params) {
    return axios({
      method: 'post',
      url: baseUrl + requestUrl,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then((response) => {
      if (response.code === "000000" && response.data !== 'null') {
        return Promise.resolve(response);
      } else {
        // Vue.prototype.$message.error(
        //     response.message,
        //     5,
        // );
        return Promise.reject('data');
      }
    }).catch(error => {
      console.log('failed', error);
    })
  },

  /**
   *
   * @param requestUrl  Interface address
   * @param params Interface parameters (object)
   * @returns {Q.Promise<any>}
   */
  get(requestUrl, params) {
    return axios({
      method: 'get',
      url: baseUrl + requestUrl,
      params: params,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then((response) => {
      // debugger;
      if (response.code === "000000") {
        return Promise.resolve(response);
      } else {
        // Vue.prototype.$message.error(
        //     response.header.errmsg,
        //     5,
        // );
        return Promise.reject('data');
      }
    }).catch(function (error) {
      console.log('failed', error);
    });
  },

  // getJson(method) {
  //
  //   return new Promise((resolve, reject) => {
  //     axios({
  //       method: 'get',
  //       baseURL: '',
  //       url: method,
  //       dataType: "json",
  //       crossDomain: true,
  //       cache: false
  //     }).then(res => {
  //       resolve(res)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  //
  // }
}
