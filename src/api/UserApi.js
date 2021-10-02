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
    putUserPushToken,
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
    return axios.get(`${API_URL}/private/users/${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }, 
    })
    .then((response) => response.data)
    .catch(event => console.error(event))
  }


  function fetchClientProfile(clientId, token) {
    console.log('api client',clientId, token )
    return axios.get(`${API_URL}/private/clients/${clientId}`, {
      headers: {
        Authorization: "Bearer " + token,
       "Content-Type": "application/json",
      }, 
    })
    .then((response) => response.data)
    .catch(event => console.error(event))
  }
}

function fetchClientOrders(email) {
  return axios.get(`${API_URL}/commandes?email=${email}`, {
    headers: {
     "Content-Type": "application/json",
    }, 
  })
  .then((response) => response.data)
  .catch(event => console.error(event))
}
  
function updateUserProfile(userProfile, token) {
  console.log('api userprofile', userProfile)
  return axios.post(`${API_URL}/private/update_client`, userProfile, {
    headers: {
      Authorization: "Bearer " + token,
     "Content-Type": "application/json",
    }, 
  })
  .then((response) => {
    response.data
    console.log('response', response.data)
    
  })
  .catch(event => console.error(event))
}

function putUserPushToken(pushToken, userId, token) {
  return axios.put(`${API_URL}/private/users/${userId}`, pushToken, {
    headers: {
      Authorization: "Bearer " + token,
     "Content-Type": "application/json",
    }, 
  })
  .then((response) => {
    response.data
    console.log('putUserPushToken success ?', response.data)
  })
  .catch(event => console.error('erreur put pushToken', event))
}