import axios from 'axios';
import { API_URL } from "@env"
const jwtDecode = require("jwt-decode");


export default function UserApi() {
  return ({
    fetchUserProfile,
    fetchClientProfile,
    postUserProfile,
    updateUserProfile,
    fetchClientOrders,
    logIn,
  });

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
    return axios.post(`${API_URL}/login_check`, login)
      .then((response) => response.data)
      .catch(event => console.error(event))
  }

  function postUserProfile(userProfile) {
    
    let data = new FormData()
      data.append('nom', userProfile.nom)
      data.append('tel', userProfile.tel)
      data.append('mail', userProfile.mail)
      data.append('Password', userProfile.Password)

    return axios.post(`${API_URL}/inscription`, data)
      .then((response) => response.data)
      .catch(event => console.error(event))
  }

  function fetchUserProfile(token) {
    
    const userId = jwtDecode(token).id
    return axios.get(`${API_URL}/users/${userId}`)
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
    return axios.get(`${API_URL}/clients/${clientId}`)
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
  return axios.get(`${API_URL}/commandes`)
  //, {
    // headers: {s
    //   Authorization: "Bearer " + token,
    //  "Content-Type": "application/json",
    // }, 
  //})
  .then((response) => response.data)
  .catch(event => console.error(event))
}
  
function updateUserProfile(userProfile) {
  
  let data = new FormData()
      data.append('userid', userProfile.user.split('/')[3].toString('')*1)
      data.append('nom', userProfile.nom)
      data.append('adresse', userProfile.adresse)
      data.append('email', userProfile.email)
      data.append('phone', userProfile.tel)
      
      console.log('userProfileapi', data)
  return axios.post(`${API_URL}/update_client`, data)
  //, {
    // headers: {s
    //   Authorization: "Bearer " + token,
    //  "Content-Type": "application/json",
    // }, 
  //})
  .then((response) => console.log('response', response.data))
  .catch(event => console.error(event))
}