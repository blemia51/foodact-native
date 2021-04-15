export default function UserApi() {
  return ({
    fetchUserProfile,
    //postUserProfile,
    //updateUserProfile,
    logIn,
  });

  // async function fetchPaniers() {
  //   return fetch('api/')
  // }

  async function logIn(login) {
    try {
      const response = await fetch("http://foodact.maresa.ma/api/login_check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });
      const datas = await response.json();
      return datas
    } catch (error) {
      console.error(error);
    }
  }
    
  

  async function fetchUserProfile(userId, token) {
    try {
      const response = await fetch(`http://foodact.maresa.ma/api/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const datas = await response.json();
      return datas
    } catch (error) {
      console.error(error);
    }
  }
} 
