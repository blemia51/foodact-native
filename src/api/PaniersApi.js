export default function PaniersApi() {
  return({
    fetchPaniers,
    fetchPaniersPrice,
    fetchPaniersName
  })

  async function fetchPaniers() {
    return fetch('api/')
  }

  async function fetchPaniersPrice() {
    try {
      const response = await fetch("http://foodact.maresa.ma/api/prix_paniers", {
        method: "GET",
        headers: {
          //Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const datas = await response.json();
      return datas
    } catch (error) {
      console.error(error);
    }
  }
    
  

  async function fetchPaniersName() {
    try {
      const response = await fetch("http://foodact.maresa.ma/api/panier_names", {
        method: "GET",
        headers: {
          //Authorization: `Bearer ${token}`,
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
