import axios from 'axios';
const jwtDecode = require("jwt-decode");


export default function UserApi() {
  return ({
    fetchUserProfile,
    fetchClientProfile,
    //postUserProfile,
    //updateUserProfile,
    fetchClientOrders,
    logIn,
  });

  // async function fetchPaniers() {
  //   return fetch('api/')
  // }

  // function logIn(login) {
  
  //    fetch("http://foodact.maresa.ma/api/login_check", {
  //       method: "POST",
  //       headers: new Header({
  //         "Content-Type": "application/json",
  //       }),
  //       body: JSON.stringify(login),
  //     })
  //     .then((response) => {
  //       //const datas =  response.json();
  //       //console.log('response', response.json())
  //       response.json()
  //     })
  //     .then((result) => result)
  //     .catch(error => console.log('error', error))
  // }

  function logIn(login) {
    return axios.post(`http://foodact.maresa.ma/api/login_check`, login)
      .then((response) => response.data)
      .catch(event => console.error(event))
  }

  function fetchUserProfile(token) {
    
    const userId = jwtDecode(token).id
    return axios.get(`http://foodact.maresa.ma/api/users/${userId}`)
    //, {
      // headers: {
      //   Authorization: "Bearer " + token,
      //  "Content-Type": "application/json",
      // }, 
    //})
    .then((response) => response.data)
    .catch(event => console.error(event))
  }


  function fetchClientProfile(clientId, token) {
    return axios.get(`http://foodact.maresa.ma/api/clients/${clientId}`)
    //, {
      // headers: {s
      //   Authorization: "Bearer " + token,
      //  "Content-Type": "application/json",
      // }, 
    //})
    .then((response) => response.data)
    .catch(event => console.error(event))
  }
}

function fetchClientOrders() {
  return axios.get('http://foodact.maresa.ma/api/commandes')
  //, {
    // headers: {s
    //   Authorization: "Bearer " + token,
    //  "Content-Type": "application/json",
    // }, 
  //})
  .then((response) => response.data)
  .catch(event => console.error(event))
}
  